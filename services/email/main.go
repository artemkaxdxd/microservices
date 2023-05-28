package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/artemkaxdxd/email/consumers"

	rabbitmq "github.com/wagslane/go-rabbitmq"
)

func main() {
	connUrl := "amqp://user:user@localhost"
	if mp := os.Getenv("AMQP_URL"); mp != "" {
		connUrl = mp
	}

	conn, err := rabbitmq.NewConn(
		connUrl,
		rabbitmq.WithConnectionOptionsLogging,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	createCustomerConsumer, err := rabbitmq.NewConsumer(
		conn,
		consumers.CreateCustomerMessage,
		"create_customer",
		rabbitmq.WithConsumerOptionsRoutingKey("create_customer"),
		rabbitmq.WithConsumerOptionsExchangeName("emails"),
		rabbitmq.WithConsumerOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer createCustomerConsumer.Close()

	confirmOrderConsumer, err := rabbitmq.NewConsumer(
		conn,
		consumers.ConfirmOrderMessage,
		"confirm_order",
		rabbitmq.WithConsumerOptionsRoutingKey("confirm_order"),
		rabbitmq.WithConsumerOptionsExchangeName("emails"),
		rabbitmq.WithConsumerOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer confirmOrderConsumer.Close()

	sigs := make(chan os.Signal, 1)
	done := make(chan bool, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigs
		fmt.Println()
		fmt.Println(sig)
		done <- true
	}()

	fmt.Println("awaiting signal")
	<-done
	fmt.Println("stopping consumer")
}
