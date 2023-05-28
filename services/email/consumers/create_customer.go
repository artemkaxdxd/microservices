package consumers

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/mailgun/mailgun-go"
	"github.com/wagslane/go-rabbitmq"
)

var mg = mailgun.NewMailgun("sandbox0399e8667bc14f18b183432e2777a0a5.mailgun.org", os.Getenv("MAILGUN_API"))

type createCustomerMessage struct {
	CustomerId string `json:"customer_id"`
	Name       string `json:"name"`
	Email      string `json:"email"`
}

func CreateCustomerMessage(d rabbitmq.Delivery) rabbitmq.Action {
	log.Printf("consumed: %v", string(d.Body))

	var message createCustomerMessage
	err := json.Unmarshal(d.Body, &message)
	if err != nil {
		log.Printf("discarded: %s", err.Error())
		return rabbitmq.NackDiscard
	}

	_, _, err = mg.Send(mg.NewMessage(
		"My service <mailgun@sandbox0399e8667bc14f18b183432e2777a0a5.mailgun.org>",
		fmt.Sprintf("Customer created with id #%s", message.CustomerId),
		fmt.Sprintf("Name of the new customer: %s", message.Name),
		message.Email,
	))
	if err != nil {
		log.Printf("requeued: %s", err.Error())
		return rabbitmq.NackRequeue
	}

	return rabbitmq.Ack
}
