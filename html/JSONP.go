package main

import (
	"crypto/tls"
    "strings"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"sync"
)

var client *http.Client

type Jar struct {
	lk      sync.Mutex
	cookies map[string][]*http.Cookie
}

func NewJar() *Jar {
	jar := new(Jar)
	jar.cookies = make(map[string][]*http.Cookie)
	return jar
}

func (jar *Jar) SetCookies(u *url.URL, cookies []*http.Cookie) {
	jar.lk.Lock()
	jar.cookies[u.Host] = cookies
	jar.lk.Unlock()
}

func (jar *Jar) Cookies(u *url.URL) []*http.Cookie {
	return jar.cookies[u.Host]
}

func sendRequest(url string) string {
	resp, err := client.Get(url)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	b, _ := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
    return string(b)
}
func getQueryString(r *http.Request) string {
    baseURL := "https://kyfw.12306.cn/otn/leftTicket/query"

    querys := r.URL.Query()

    query := make(map[string]string)
    query["leftTicketDTO.train_date"] = querys.Get("date")
    query["leftTicketDTO.from_station"] = querys.Get("from")
    query["leftTicketDTO.to_station"] = querys.Get("to")
    query["purpose_codes"] = "ADULT"

    strs := make([]string, 0)
    for key, value := range(query) {
        strs = append(strs, key + "=" + value)
    }
    return baseURL + "?" + strings.Join(strs, "&")
}

func queryHandler(w http.ResponseWriter, r *http.Request) {
    response := sendRequest(getQueryString(r));
    fmt.Println(response)
    callback := r.URL.Query().Get("callback")
    fmt.Fprintln(w, callback + "(" + response + ");")
}

func main() {
	jar := NewJar()
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
    client = &http.Client{Transport: tr, Jar: jar}

    http.HandleFunc("/query", queryHandler)
    http.ListenAndServe(":4000", nil)
}
