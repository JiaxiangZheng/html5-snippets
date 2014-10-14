// serve as a web server to process JSONP request
// !go run JSONP.go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func MustGetFileContentAsString(filename string) string {
	bytes, err := ioutil.ReadFile(filename)
	if err != nil {
		panic(err)
	}
	return string(bytes)
}
func QueryHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("foud a request")
	callback := "fnProcess"
	response := `{"name":"Jiaxiang Zheng","sex":"male","school":[{"NCU":"Nanchang University"},{"ZJU":"Zhejiang University"}]}`
	fmt.Fprintf(w, "%s(%s)", callback, response)
	return
}

func main() {
	http.HandleFunc("/query", QueryHandler)
	http.ListenAndServe(":4000", nil)
}

