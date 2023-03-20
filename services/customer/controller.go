package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) AddCustomer(c *gin.Context) {
	customer := Customer{}

	err := c.BindJSON(&customer)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r := s.DB.Create(&customer)

	if r.Error != nil {
		log.Fatal(r.Error)
	}

	s.DB.Save(&customer)

	c.JSON(http.StatusOK, customer)
}

func (s *Server) GetCustomerById(c *gin.Context) {
	customer := Customer{}

	id := c.Param("id")

	ret := s.DB.First(&customer, "id = ?", id)

	if ret.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if ret.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ret.Error})
		return
	}

	c.JSON(http.StatusOK, customer)
}
