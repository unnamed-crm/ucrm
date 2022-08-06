FROM golang:1.18-alpine as builder

WORKDIR /srv

COPY ./go.mod ./ ./go.sum ./

RUN go mod download \
    && go mod verify

COPY ./ ./

RUN go install github.com/swaggo/swag/cmd/swag@latest && swag init -g ./cmd/app/main.go

RUN CGO_ENABLED=0 GOOS=linux \
    go build -a \
    -ldflags '-extldflags "-static"' \
    -o app ./cmd/app/main.go

WORKDIR /srv

FROM scratch

COPY --from=builder srv/app /usr/local/bin/app

COPY ./config/ /usr/local/bin/app
ENTRYPOINT ["/usr/local/bin/app/main"]
