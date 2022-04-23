FROM golang:1.18-alpine as builder

WORKDIR /.

RUN CGO_ENABLED=0 go get -ldflags "-s -w -extldflags '-static'" github.com/go-delve/delve/cmd/dlv

COPY go.mod ./
COPY go.sum ./
RUN go mod download
RUN go mod verify

COPY /app ./app
COPY /pkg ./pkg
COPY /cmd ./cmd
COPY /docs ./docs

RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o app ./cmd/app/main.go

WORKDIR /
FROM alpine:3.14

COPY /config/ /usr/local/bin/app
COPY --from=builder /app /usr/local/bin/app

COPY --from=builder /go/bin/dlv /
