FROM golang:1.20-alpine3.16 AS server_builder

RUN apk add gcc libc-dev

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . ./

RUN go build -ldflags "-w -s -linkmode external -extldflags -static" -a main.go

FROM scratch
EXPOSE 8080
COPY --from=server_builder /app/main .
CMD ["./main"]