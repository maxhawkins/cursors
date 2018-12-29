package main

import (
	"fmt"
	"sync"
	"time"

	"github.com/pions/webrtc"
	"github.com/pions/webrtc/pkg/datachannel"
	"github.com/pions/webrtc/pkg/media"
)

type MsgType uint8

const (
	MsgStart MsgType = iota
	MsgStop
	MsgMove
	MsgPositions
)

type Conn struct {
	pc  *webrtc.RTCPeerConnection
	out *webrtc.RTCTrack

	inMu sync.Mutex
	in   *webrtc.RTCTrack

	dcMu sync.RWMutex
	dc   *webrtc.RTCDataChannel

	sync struct {
		sync.Mutex

		baseTsPrev, baseTs, lastTs, prevTs     uint32
		baseSeqPrev, baseSeq, lastSeq, prevSeq uint16
		lastSSRC                               uint32
		lastTime                               time.Time
	}

	OnMessage func(MsgType, []byte)
	OnReady   func()
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

func (c *Conn) SendMessage(t MsgType, data []byte) {
	c.dcMu.RLock()
	defer c.dcMu.RUnlock()

	if c.dc == nil {
		fmt.Println("no dc to send to")
		return
	}

	msg := make([]byte, len(data)+1)
	copy(msg[1:], data)
	msg[0] = byte(t)

	if err := c.dc.Send(datachannel.PayloadBinary{Data: msg}); err != nil {
		fmt.Println(err)
		return
	}
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

// func (c *Conn) SendPacket(p *rtp.Packet) {
// 	s := &c.sync
// 	s.Lock()
// 	defer s.Unlock()

// 	if p.SSRC != s.lastSSRC {
// 		fmt.Println("new ssrc", p.SSRC)
// 		s.lastSSRC = p.SSRC
// 		s.baseTsPrev = s.lastTs
// 		s.baseTs = p.Timestamp
// 		s.baseSeqPrev = s.lastSeq
// 		s.baseSeq = p.SequenceNumber

// 		if !s.lastTime.IsZero() {
// 			timeDiff := time.Since(s.lastTime)
// 			const akhz = 48
// 			sampDiff := uint32((timeDiff * time.Duration(akhz)) / time.Second)
// 			if sampDiff == 0 {
// 				sampDiff = 1
// 			}
// 			s.baseTsPrev += sampDiff
// 			s.prevTs += sampDiff
// 			s.lastTs += sampDiff
// 		}
// 	}

// 	s.prevTs = s.lastTs
// 	s.lastTs = (p.Timestamp - s.baseTs) + s.baseTsPrev
// 	s.prevSeq = s.lastSeq
// 	s.lastSeq = (p.SequenceNumber - s.baseSeq) + s.baseSeqPrev + 1

// 	p.Timestamp = s.lastTs
// 	p.SequenceNumber = s.lastSeq

// 	s.lastTime = time.Now()

// 	p.SSRC = c.out.Ssrc
// 	c.out.RawRTP <- p
// }

func (c *Conn) onDataChannel(dc *webrtc.RTCDataChannel) {
	c.dcMu.Lock()
	defer c.dcMu.Unlock()

	if c.dc != nil {
		fmt.Println("Warning: extra data channel opened")
		return
	}
	c.dc = dc

	dc.OnMessage(c.onDataMessage)
}

func (c *Conn) onDataMessage(p datachannel.Payload) {
	pl, ok := p.(*datachannel.PayloadBinary)
	if !ok {
		fmt.Println("unknown data type")
		return
	}
	if len(pl.Data) == 0 {
		fmt.Println("invalid message")
		return
	}
	typ := MsgType(pl.Data[0])

	if c.OnMessage != nil {
		c.OnMessage(typ, pl.Data[1:])
	}
}
