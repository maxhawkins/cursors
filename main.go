//go:generate go run github.com/elazarl/go-bindata-assetfs/go-bindata-assetfs -tags assetfs www/...
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/pions/webrtc"
)

type Demo struct {
	RTCConfig webrtc.RTCConfiguration
	room      Room
}

func (d *Demo) HandleStart(w http.ResponseWriter, r *http.Request) {
	conn, err := NewConn(d.RTCConfig)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	conn.OnReady = func() {
		d.room.AddMember(conn)
	}

	var offer webrtc.RTCSessionDescription
	if err := json.NewDecoder(r.Body).Decode(&offer); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	answer, err := conn.Negotiate(offer)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(answer)
}

func (d *Demo) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/start" {
		d.HandleStart(w, r)
		return
	}

	http.FileServer(assetFS()).ServeHTTP(w, r)
}

func main() {
	fmt.Println("Starting up...")
	webrtc.RegisterCodec(webrtc.NewRTCRtpOpusCodec(webrtc.DefaultPayloadTypeOpus, 48000, 2))

	demo := &Demo{}
	demo.RTCConfig = webrtc.RTCConfiguration{
		IceServers: []webrtc.RTCIceServer{
			{URLs: []string{"stun:stun.l.google.com:19302"}},
		},
	}
	demo.room.floor = -1

	// Start server on an open port
	l, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	fmt.Println("listening at", port)

	var handler http.Handler
	handler = demo
	handler = handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
	)(handler)

	if err := http.Serve(l, handler); err != nil {
		log.Fatal(err)
	}
}
