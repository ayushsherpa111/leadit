package utils

import (
	"io"
)

func ParseBody(contentLength int64, body io.ReadCloser) []byte {
	content := make([]byte, contentLength)
	body.Read(content)
	return content
}
