package main

import (
	"fmt"
	"sync"
	"time"

	"github.com/golang/protobuf/proto"
	pb "github.com/maxhawkins/cursors/proto"
	"github.com/pions/webrtc/pkg/media"
)

type UserID uint32

type Room struct {
	floorMu sync.RWMutex
	floor   UserID

	lastIDMu sync.Mutex
	lastID   UserID

	membersMu sync.Mutex
	members   map[UserID]*Conn

	posMu sync.Mutex
	pos   map[UserID]*pb.CursorPosition
}

func NewRoom() *Room {
	return &Room{
		pos:     make(map[UserID]*pb.CursorPosition),
		members: make(map[UserID]*Conn),
	}
}

func (r *Room) TakeFloor(id UserID) {
	r.floorMu.Lock()
	defer r.floorMu.Unlock()

	if r.floor != 0 { // someone else has the floor
		return
	}

	r.floor = id
}

func (r *Room) GiveFloor(id UserID) {
	r.floorMu.Lock()
	defer r.floorMu.Unlock()

	if r.floor != id { // someone else has the floor
		return
	}

	r.floor = 0
}

func (r *Room) nextID() UserID {
	r.lastIDMu.Lock()
	defer r.lastIDMu.Unlock()
	r.lastID++
	return r.lastID
}

func (r *Room) RemoveMember(id UserID) {
	r.membersMu.Lock()
	delete(r.members, id)
	r.membersMu.Unlock()

	r.floorMu.Lock()
	if r.floor == id {
		r.floor = 0
	}
	r.floorMu.Unlock()

	r.posMu.Lock()
	delete(r.pos, id)
	r.posMu.Unlock()
}

func (r *Room) AddMember(c *Conn) UserID {
	id := r.nextID()

	r.membersMu.Lock()
	r.members[id] = c
	r.membersMu.Unlock()

	c.OnFrame = func(frame *pb.ClientFrame) {
		r.posMu.Lock()
		defer r.posMu.Unlock()

		if _, ok := r.members[id]; !ok {
			// left room
			return
		}

		p := frame.Position
		oldP, ok := r.pos[id]
		if !ok || oldP.TimestampMs < p.TimestampMs {
			r.pos[id] = p
		}
	}

	c.OnRPC = func(m *pb.RPC) {
		switch m.Type {
		case pb.RPCType_BYE:
			fmt.Println("BYE")
			r.RemoveMember(id)

		case pb.RPCType_SPEAK:
			var req pb.SpeakRequest
			if err := proto.Unmarshal(m.Payload, &req); err != nil {
				fmt.Println(err)
			}
			if req.Speaking {
				r.TakeFloor(id)
			} else {
				r.GiveFloor(id)
			}
		}
	}

	go func() {
		var lastFrame *pb.ServerFrame
		sendFrame := func() {
			var positions []*pb.CursorPosition
			for id, p := range r.pos {
				p.UserId = uint32(id)
				positions = append(positions, p)
			}

			frame := &pb.ServerFrame{
				Positions: positions,
				SpeakerId: uint32(r.floor),
			}

			if !proto.Equal(frame, lastFrame) {
				c.SendFrame(frame)
			}

			lastFrame = frame
		}

		sendFrame()
		for range time.Tick(20 * time.Millisecond) {
			r.membersMu.Lock()
			_, ok := r.members[id]
			r.membersMu.Unlock()
			if !ok {
				break
			}

			sendFrame()
		}
	}()

	go func() {
		for pkt := range c.in.Packets {
			r.floorMu.RLock()
			floor := r.floor
			r.floorMu.RUnlock()
			if floor != id {
				continue
			}

			s := &media.RTCSample{Data: pkt.Payload, Samples: 960}

			for i, member := range r.members {
				if i == id { // skip us
					continue
				}

				go member.SendSample(*s)
			}
		}
	}()

	return id
}
