package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/goccy/go-json"
	"github.com/wagslane/go-rabbitmq"
)

type UpdateBody struct {
	Name          string `json:"name"`
	Description   string `json:"description"`
	Email         string `json:"email"`
	Age           string `json:"age"`
	DriverLicense string `json:"driver_license"`
}

func (s *Server) GetCustomers(c *gin.Context) {
	var customers []Customer

	res := s.DB.Find(&customers)

	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No customers found"})
		return
	}

	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": res.Error})
		return
	}

	c.JSON(http.StatusOK, customers)
}

func (s *Server) GetCustomerById(c *gin.Context) {
	var customer Customer

	id := c.Param("id")

	res := s.DB.First(&customer, "id = ?", id)

	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": res.Error})
		return
	}

	// For checking timeout and circuit breaker
	if s.Frozen {
		time.Sleep(time.Second * 10)
	}
	c.JSON(http.StatusOK, customer)
}

func (s *Server) AddCustomer(c *gin.Context) {
	var customer Customer

	if err := c.BindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res := s.DB.Create(&customer)

	if res.Error != nil {
		log.Fatal(res.Error)
	}

	s.DB.Save(&customer)

	payload, _ := json.Marshal(map[string]string{
		"customer_id": strconv.Itoa(int(customer.Id)),
		"name":        customer.Name,
		"email":       customer.Email})

	publisher, err := rabbitmq.NewPublisher(
		s.Broker,
		rabbitmq.WithPublisherOptionsLogging,
		rabbitmq.WithPublisherOptionsExchangeName("emails"),
		rabbitmq.WithPublisherOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer publisher.Close()

	err = publisher.Publish(
		payload,
		[]string{"create_customer"},
		rabbitmq.WithPublishOptionsContentType("application/json"),
		rabbitmq.WithPublishOptionsExchange("emails"),
	)
	if err != nil {
		log.Println(err)
	}

	c.JSON(http.StatusOK, customer)
}

func (s *Server) UpdateCustomer(c *gin.Context) {
	var customer Customer
	var body UpdateBody

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")
	res := s.DB.First(&customer, "id = ?", id)

	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": res.Error})
		return
	}

	// add a check if update body field is empty ?
	customer.Name = body.Name
	customer.Description = body.Description
	customer.Email = body.Email
	customer.Age = body.Age
	customer.DriverLicense = body.DriverLicense

	save := s.DB.Save(&customer)

	if save.Error != nil {
		log.Fatal(save.Error)
	}

	s.DB.Save(&customer)

	c.JSON(http.StatusOK, customer)
}

func (s *Server) DeleteCustomer(c *gin.Context) {
	var customer Customer

	id := c.Param("id")

	res := s.DB.First(&customer, "id = ?", id)

	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": res.Error})
		return
	}

	s.DB.Delete(&customer)

	c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted"})
}

func (s *Server) Freeze(c *gin.Context) {
	s.Frozen = !s.Frozen
	c.JSON(http.StatusOK, gin.H{"Freeze status": fmt.Sprintf("%v", s.Frozen)})
}
