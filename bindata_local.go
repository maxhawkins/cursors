// +build !assetfs

package main

import "net/http"

func assetFS() http.Dir {
	return http.Dir("www")
}
