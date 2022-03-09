package triggers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"time"
)

func SendCardUpdatesToSubscriber(hostUrl string, newState interface{}, oldState interface{}) {
	argMap := map[string]interface{}{}
	argMap["newState"] = newState
	argMap["oldState"] = oldState

	stringifyArgs,err := json.Marshal(argMap)
	if err != nil {
		log.Printf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}

	body := bytes.NewReader(stringifyArgs)
	reqURL, err := url.Parse(hostUrl)
	if err != nil {
		log.Printf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}
	req, err := http.NewRequest(http.MethodPost, reqURL.String(), body)
	if err != nil {
		log.Printf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}
	req.Header.Set("Content-Type", "application/json")
	tr := &http.Transport{}
	client := &http.Client{Transport: tr, Timeout: time.Duration(30) * time.Second}
	resp,err := client.Do(req)
	if err != nil {
		log.Printf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}
	log.Printf("[Trigger] url webhook: %s, [Result] :%s", hostUrl,resp.Status)
}
