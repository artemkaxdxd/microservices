FROM golang:1.20-alpine3.16 AS service_builder

WORKDIR /

# встановлення додаткових інструментів та бібліотек
RUN apk add gcc libc-dev

# встановлення залежностей
COPY go.mod go.sum ./
RUN go mod download

# копіювання основного коду сервісу
COPY . ./

# збарання сервісу
RUN go build -ldflags "-w -s -linkmode external -extldflags -static" -a .

# підготовка фінального образу
FROM scratch
EXPOSE 8080
COPY --from=service_builder customer .
CMD ["./customer"]