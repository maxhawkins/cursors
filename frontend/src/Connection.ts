import {
    IRPC,
    RPC,
    RPCType,
    ISpeakRequest,
    SpeakRequest,
    ServerFrame,
    IClientFrame,
    ClientFrame,
} from "./proto";

export default class Connection {

    public onAudio: (stream: MediaStream) => any;
    public onRPC: (type: RPCType, payload: any) => any;
    public onFrame: (frame: ServerFrame) => any;

    private conn: RTCPeerConnection;
    private rpcChannel: RTCDataChannel;
    private frameChannel: RTCDataChannel;

    private frameSeq = 0;

    constructor() {
        const conn = this.conn = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
        });
        conn.onicecandidate = this.onicecandidate;
        conn.ontrack = this.ontrack;

        const rpcChannel = this.rpcChannel = conn.createDataChannel('rpc');
        rpcChannel.binaryType = 'arraybuffer';
        rpcChannel.onmessage = this.onRPCMessage;

        const frameChannel = this.frameChannel = conn.createDataChannel('frame', {
            maxPacketLifeTime: 30,
            ordered: false,
        });
        frameChannel.binaryType = 'arraybuffer';
        frameChannel.onmessage = this.onFrameMessage;
    }

    public sendFrame(frame: IClientFrame) {
        if (this.frameChannel.readyState !== 'open') { return; }
        frame.sequence = this.frameSeq;
        this.frameSeq++;
        const data = ClientFrame.encode(frame).finish();
        this.frameChannel.send(data);
    }
    public setSpeaker(req: ISpeakRequest) {
        const payload = SpeakRequest.encode(req).finish();
        this.sendRPC({
            type: RPCType.SPEAK,
            payload,
        });
    }
    public sendBye() {
        this.sendRPC({
            type: RPCType.BYE,
        });
    }

    public async startAudio() {
        const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
        const audio = stream.getAudioTracks()[0];
        this.conn.addTransceiver(audio, {
            direction: 'sendrecv',
        });

        const offer = await this.conn.createOffer();
        await this.conn.setLocalDescription(offer);

        audio.enabled = false;

        return audio;
    }
    
    private ontrack = (e: RTCTrackEvent) => {
        const stream = e.streams[0];
        if (this.onAudio)  {
            this.onAudio(stream);
        }
    }

    private onicecandidate = async (e: RTCPeerConnectionIceEvent) => {
        if (e.candidate) { return; }

        const localDesc = JSON.stringify(this.conn.localDescription);
        const resp = await fetch('http://localhost:8080/start', {
            body: localDesc,
            method: 'POST',
        });
        const data = await resp.json();

        const answer = new RTCSessionDescription(data);
        this.conn.setRemoteDescription(answer);
    }

    private onFrameMessage = (e: MessageEvent) => {
        const data = new Uint8Array(e.data);
        if (data.byteLength < 2) {
            return;
        }
        const frame = ServerFrame.decode(data);
        this.onFrame(frame);
    }

    private onRPCMessage = (e: MessageEvent) => {
        const data = new Uint8Array(e.data);
        const {payload, type} = RPC.decode(data);

        this.onRPC(type, payload);
    }
    private sendRPC = (req: IRPC) => {
        if (this.rpcChannel.readyState !== 'open') { return; }
        const data = RPC.encode(req).finish();
        this.rpcChannel.send(data);
    }
}