package utils

import (
	"io"
)

func ParseBody(contentLength int, body io.ReadCloser) []byte {
	content := make([]byte, contentLength)
	body.Read(content)
	return content
}
