FROM golang:1.16-alpine as builder

WORKDIR /.

COPY go.mod ./
COPY go.sum ./
RUN go mod download
RUN go mod verify

COPY /app ./app
COPY /pkg ./pkg
COPY /cmd ./cmd

RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o app ./cmd/app/main.go


FROM alpine:3.14
COPY --from=builder /app /usr/local/bin/app

ENTRYPOINT ["/usr/local/bin/app/main"]
