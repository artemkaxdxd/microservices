package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Server struct {
	DB  *gorm.DB
	Gin *gin.Engine
}

func (s *Server) Init(dsn string) *Server {
	db, err := gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&Customer{})
	s.DB = db

	g := gin.Default()

	s.Gin = g

	return s
}

func (s *Server) RegisterRoutes() {
	//server.Gin.GET("/api/customers",server.GetCustomer)
	//server.Gin.GET("/api/customers/:id",server.GetCustomerById)
	//server.Gin.POST("/api/customers", server.AddCustomer)
	//server.Gin.PATCH("/api/customers/:id", server.UpdateCustomer)
	//server.Gin.DELETE("/api/customers/:id", server.DeleteCustomer)
}
