package main

import (
	"bytes"
	"encoding/binary"
	"sync"
	"time"

	"github.com/pions/webrtc/pkg/media"
)

type MousePos struct {
	X, Y uint32
}

type Room struct {
	floorMu sync.RWMutex
	floor   int

	membersMu sync.Mutex
	members   []*Conn

	posMu sync.Mutex
	pos   []MousePos
}

func (r *Room) TakeFloor(id uint32) {
	r.floorMu.Lock()
	defer r.floorMu.Unlock()

	if r.floor != -1 { // someone else has the floor
		return
	}

	r.floor = int(id)

	buf := make([]byte, 4)
	binary.BigEndian.PutUint32(buf, id)
	for _, m := range r.members {
		go m.SendMessage(MsgStart, buf)
	}
}

func (r *Room) GiveFloor(id uint32) {
	r.floorMu.Lock()
	defer r.floorMu.Unlock()

	if r.floor != int(id) { // someone else has the floor
		return
	}

	r.floor = -1

	for _, m := range r.members {
		go m.SendMessage(MsgStop, nil)
	}
}

func (r *Room) AddMember(c *Conn) {
	r.membersMu.Lock()
	id := uint32(len(r.members))
	r.members = append(r.members, c)
	r.pos = append(r.pos, MousePos{})
	r.membersMu.Unlock()

	c.OnMessage = func(t MsgType, data []byte) {
		switch t {
		case MsgStart:
			r.TakeFloor(id)
		case MsgStop:
			r.GiveFloor(id)
		case MsgMove:
			x := binary.BigEndian.Uint32(data)
			y := binary.BigEndian.Uint32(data[4:])

			r.posMu.Lock()
			r.pos[id] = MousePos{x, y}
			r.posMu.Unlock()
		}
	}

	go func() {
		lastMsg := make([]byte, 0, 1024)
		msg := make([]byte, 0, 1024)
		for range time.Tick(20 * time.Millisecond) {
			msg = msg[:len(r.pos)*12]
			var off int
			for i, p := range r.pos {
				binary.BigEndian.PutUint32(msg[off:off+4], p.X)
				off += 4
				binary.BigEndian.PutUint32(msg[off:off+4], p.Y)
				off += 4
				binary.BigEndian.PutUint32(msg[off:off+4], uint32(i))
				off += 4
			}

			if !bytes.Equal(lastMsg, msg) {
				c.SendMessage(MsgPositions, msg)
			}

			lastMsg = lastMsg[:len(msg)]
			copy(lastMsg, msg)
		}
	}()

	go func() {
		for pkt := range c.in.Packets {
			r.floorMu.RLock()
			floor := r.floor
			r.floorMu.RUnlock()
			if floor != int(id) {
				continue
			}

			s := &media.RTCSample{Data: pkt.Payload, Samples: 960}

			for i, member := range r.members {
				if i == int(id) { // skip us
					continue
				}

				go member.SendSample(*s)
			}
		}
	}()
}
