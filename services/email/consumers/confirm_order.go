package consumers

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/wagslane/go-rabbitmq"
)

type confirmOrderMessage struct {
	OrderId    string `json:"order_id"`
	CustomerId string `json:"customer_id"`
	Title      string `json:"title"`
	Email      string `json:"email"`
}

func ConfirmOrderMessage(d rabbitmq.Delivery) rabbitmq.Action {
	log.Printf("consumed: %v", string(d.Body))

	var message confirmOrderMessage
	err := json.Unmarshal(d.Body, &message)
	if err != nil {
		log.Printf("discarded: %s", err.Error())
		return rabbitmq.NackDiscard
	}

	_, _, err = mg.Send(mg.NewMessage(
		"My service <mailgun@sandbox0399e8667bc14f18b183432e2777a0a5.mailgun.org>",
		fmt.Sprintf("Order confirmation: #%s", message.OrderId),
		fmt.Sprintf(
			"Your order has been confirmed. Title: %s.\n\nYour customer id: #%s",
			message.Title,
			message.CustomerId),
		message.Email,
	))
	if err != nil {
		log.Printf("requeued: %s", err.Error())
		return rabbitmq.NackRequeue
	}

	return rabbitmq.Ack
}
