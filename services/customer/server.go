package main

import (
	"log"

	"github.com/gin-contrib/cors"
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

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	s.Gin.Use(cors.New(corsConfig))

	return s
}

func (s *Server) RegisterRoutes() {
	s.Gin.GET("/api/customers", s.GetCustomers)
	s.Gin.GET("/api/customers/:id", s.GetCustomerById)
	s.Gin.POST("/api/customers", s.AddCustomer)
	s.Gin.PATCH("/api/customers/:id", s.UpdateCustomer)
	s.Gin.DELETE("/api/customers/:id", s.DeleteCustomer)
}
