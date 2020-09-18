FROM golang:1.15

WORKDIR /usr/share/app

EXPOSE 5000

COPY . .

RUN go build

CMD ["go","run","server.go"]
