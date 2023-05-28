package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/wagslane/go-rabbitmq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Server struct {
	DB     *gorm.DB
	Gin    *gin.Engine
	Broker *rabbitmq.Conn
	Frozen bool
}

func (s *Server) Init(dsn string) *Server {
	connUrl := "amqp://user:user@localhost"
	if mp := os.Getenv("AMQP_URL"); mp != "" {
		connUrl = mp
	}

	var err error
	s.Broker, err = rabbitmq.NewConn(
		connUrl,
		rabbitmq.WithConnectionOptionsLogging,
	)
	if err != nil {
		log.Fatal(err)
	}

	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&Customer{})
	s.DB = db

	g := gin.Default()
	s.Gin = g

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	s.Gin.Use(cors.New(corsConfig))

	return s
}

func (s *Server) RegisterRoutes() {
	s.Gin.GET("/api/customers", s.GetCustomers)
	s.Gin.GET("/api/customers/:id", s.GetCustomerById)
	s.Gin.POST("/api/customers", s.AddCustomer)
	s.Gin.POST("/api/customers/freeze", s.Freeze)
	s.Gin.PATCH("/api/customers/:id", s.UpdateCustomer)
	s.Gin.DELETE("/api/customers/:id", s.DeleteCustomer)
}
