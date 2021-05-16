package scalar

import (
	"encoding/json"
	"errors"
	"io"

	"github.com/99designs/gqlgen/graphql"
	"github.com/lib/pq"
)

func MarshalStringArray(a pq.StringArray) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		data, _ := json.Marshal(a)
		io.WriteString(w, string(data))
	})
}

func UnmarshalStringArray(v interface{}) (pq.StringArray, error) {
	a, ok := v.(pq.StringArray)
	if !ok {
		return nil, errors.New("failed to cast to pq.StringArray")
	}
	return a, nil
}
