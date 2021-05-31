package resolver

import (
	"encoding/base64"
	"encoding/binary"
)

func encodeCursor(id int64) string {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, uint64(id))

	return base64.StdEncoding.EncodeToString(b)
}
