package main

import (
	"errors"
	"fmt"
	"sync"

	"github.com/golang/protobuf/proto"

	pb "github.com/maxhawkins/cursors/proto"
	"github.com/pions/webrtc"
	"github.com/pions/webrtc/pkg/datachannel"
	"github.com/pions/webrtc/pkg/media"
)

type Conn struct {
	pc  *webrtc.RTCPeerConnection
	out *webrtc.RTCTrack

	inMu sync.Mutex
	in   *webrtc.RTCTrack

	dcMu         sync.RWMutex
	rpcDC        *webrtc.RTCDataChannel
	frameDC      *webrtc.RTCDataChannel
	lastFrameSeq uint32

	OnRPC   func(*pb.RPC)
	OnFrame func(*pb.ClientFrame)
	OnReady func()
}

func NewConn(config webrtc.RTCConfiguration) (*Conn, error) {
	conn := &Conn{}

	pc, err := webrtc.New(config)
	if err != nil {
		return conn, err
	}
	conn.pc = pc

	out, err := pc.NewRTCSampleTrack(webrtc.DefaultPayloadTypeOpus, "audio", "echo")
	if err != nil {
		return conn, err
	}
	pc.AddTrack(out)
	conn.out = out

	pc.OnDataChannel(conn.onDataChannel)
	pc.OnTrack(conn.onTrack)

	return conn, nil
}

func (c *Conn) Negotiate(offer webrtc.RTCSessionDescription) (answer webrtc.RTCSessionDescription, err error) {
	if err := c.pc.SetRemoteDescription(offer); err != nil {
		return answer, err
	}

	answer, err = c.pc.CreateAnswer(nil)
	if err != nil {
		return answer, err
	}

	return answer, nil
}

func (c *Conn) SendFrame(frame *pb.ServerFrame) error {
	c.dcMu.RLock()
	defer c.dcMu.RUnlock()

	if c.frameDC == nil {
		return errors.New("no dc to send to")
	}

	data, err := proto.Marshal(frame)
	if err != nil {
		return err
	}

	payload := datachannel.PayloadBinary{Data: data}
	if err := c.frameDC.Send(payload); err != nil {
		return err
	}

	return nil
}

func (c *Conn) SendMessage(rt pb.RPCType, msg proto.Message) error {
	c.dcMu.RLock()
	defer c.dcMu.RUnlock()

	if c.rpcDC == nil {
		return errors.New("no dc to send to")
	}

	payload, err := proto.Marshal(msg)
	if err != nil {
		return err
	}

	data, err := proto.Marshal(&pb.RPC{
		Type:    rt,
		Payload: payload,
	})

	if err := c.rpcDC.Send(datachannel.PayloadBinary{Data: data}); err != nil {
		return err
	}

	return nil
}

func (c *Conn) onTrack(track *webrtc.RTCTrack) {
	c.inMu.Lock()
	defer c.inMu.Unlock()

	if c.in != nil {
		fmt.Println("unexpected second track")
		return
	}
	c.in = track

	if c.OnReady != nil {
		go c.OnReady()
	}
}

func (c *Conn) SendSample(s media.RTCSample) {
	c.out.Samples <- s
}

func (c *Conn) onDataChannel(dc *webrtc.RTCDataChannel) {
	c.dcMu.Lock()
	defer c.dcMu.Unlock()

	// TODO: make sure this doens't happen multiple times
	switch dc.Label {
	case "frame":
		c.frameDC = dc
		dc.OnMessage(func(p datachannel.Payload) {
			c.onFrameMessage(p)
		})
	case "rpc":
		c.rpcDC = dc
		dc.OnMessage(func(p datachannel.Payload) {
			c.onRPCMessage(p)
		})
	}
}

func (c *Conn) onFrameMessage(p datachannel.Payload) error {
	pl, ok := p.(*datachannel.PayloadBinary)
	if !ok {
		return errors.New("expected binary payload")
	}

	msg := &pb.ClientFrame{}
	if err := proto.Unmarshal(pl.Data, msg); err != nil {
		return err
	}

	c.dcMu.Lock()
	if msg.Sequence < c.lastFrameSeq {
		c.dcMu.Unlock()
		return nil
	}
	c.lastFrameSeq++
	c.dcMu.Unlock()

	if c.OnFrame != nil {
		c.OnFrame(msg)
	}

	return nil
}

func (c *Conn) onRPCMessage(p datachannel.Payload) error {
	pl, ok := p.(*datachannel.PayloadBinary)
	if !ok {
		return errors.New("expected binary payload")
	}

	msg := &pb.RPC{}
	if err := proto.Unmarshal(pl.Data, msg); err != nil {
		return err
	}

	if c.OnRPC != nil {
		c.OnRPC(msg)
	}

	return nil
}
