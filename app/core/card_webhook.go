package core

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/url"
	"time"

	blogger "github.com/sirupsen/logrus"
)

func SendCardUpdatesToSubscriber(hostUrl string, newState interface{}, oldState interface{}) {
	argMap := map[string]interface{}{}
	argMap["newState"] = newState
	argMap["oldState"] = oldState
	stringifyArgs, err := json.Marshal(argMap)
	if err != nil {
		blogger.Errorf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}

	body := bytes.NewReader(stringifyArgs)
	reqURL, err := url.Parse(hostUrl)
	if err != nil {
		blogger.Errorf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}

	req, err := http.NewRequest(http.MethodPost, reqURL.String(), body)
	if err != nil {
		blogger.Infof("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}

	req.Header.Set("Content-Type", "application/json")
	tr := &http.Transport{}
	client := &http.Client{Transport: tr, Timeout: time.Duration(30) * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		blogger.Errorf("[Trigger] url webhook: %s, [Error] :%s", hostUrl, err.Error())
	}

	blogger.Infof("[Trigger] url webhook: %s, [Result] :%s", hostUrl, resp.Status)
}
