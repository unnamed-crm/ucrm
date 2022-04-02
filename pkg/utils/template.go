package utils

import (
	"bytes"
	"text/template"
)

func WrapTemplateData(payload interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	result["Data"] = payload
	return result
}

func RenderTemplate(stringTemplate string, payload map[string]interface{}) (string, error) {
	t, err := template.New("letter").
		Parse(stringTemplate)
	if err != nil {
		return "", err
	}
	var buf bytes.Buffer
	if err := t.Execute(&buf, payload); err != nil {
		return "", err
	}
	return buf.String(), nil
}
