FROM golang:1.18-alpine as builder

WORKDIR /srv

COPY ./services/go.mod ./ ./services/go.sum ./

RUN go mod download \
    && go mod verify

COPY ./services/ ./

RUN CGO_ENABLED=0 GOOS=linux \
    go build -a \
    -ldflags '-extldflags "-static"' \
    -o app ./cmd/app/main.go

WORKDIR /srv

FROM scratch

COPY --from=builder srv/app /usr/local/bin/app

COPY ./services/config/ /usr/local/bin/app
ENTRYPOINT ["/usr/local/bin/app/main"]
