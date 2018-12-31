import * as React from 'react';
import './App.css';

import Connection from './Connection';
import {
  RPCType,
  ServerFrame,
} from './proto';
import WorldView from './WorldView';

interface IState {
  frame: ServerFrame,
  started: boolean,
  width: number,
  height: number,
}

class App extends React.Component<{}, IState> {
  public state: IState = {
    height: 0,
    started: false,
    width: 0,
    frame: new ServerFrame(),
  }

  private audio: HTMLAudioElement = new Audio();
  private conn: Connection;
  private wrapper: HTMLDivElement | null;
  private microphone: MediaStreamTrack | null;

  public componentWillMount() {
    this.conn = new Connection();
    this.conn.onRPC = this.onRPC;
    this.conn.onFrame = this.onFrame;
    this.conn.onAudio = this.onAudio;
    window.addEventListener('resize', this.onResize);
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }
  public render() {
    const {
      started,
      frame,
      width,
      height
    } = this.state;
    return (
      <div ref={this.onWrapper} className="App">
        {
          started
          ? (<WorldView
              width={width}
              height={height}
              frame={frame}
              onSpeaking={this.onSpeaking}
              onMove={this.onMove} /> )
          : (<button onClick={this.start}>Start</button>)
        }
      </div>
    );
  }
  private onResize = () => {
    if (!this.wrapper) {return}
    this.setState({
      height: this.wrapper.clientHeight,
      width: this.wrapper.clientWidth,
    })
  }
  private onWrapper = (el: HTMLDivElement | null) => {
    this.wrapper = el;
    this.onResize();
  }
  private onRPC = (type: RPCType, payload: any) => {
    console.log(type);
  }
  private onFrame = (frame: ServerFrame) => {
    if (frame.sequence < this.state.frame.sequence) { // FIXME: uint32 overflow
      return;
    }
    this.setState({frame});
  }
  private onMove = (x: number, y: number) => {
    const timestampMs = Date.now();
    this.conn.sendFrame({
      position: {x, y, timestampMs},
    });
  }
  private onSpeaking = (speaking: boolean) => {
    if (this.microphone) {
      this.microphone.enabled = speaking;
    }
    
    this.conn.setSpeaker({speaking});
  }
  private start = async () => {
    this.microphone = await this.conn.startAudio();
    this.setState({started: true});
  }
  private onAudio = (stream: MediaStream) => {
    this.audio.srcObject = stream;
    this.audio.play();
  }
  private onBeforeUnload = () => {
    this.conn.sendBye();
  }
}

export default App;
