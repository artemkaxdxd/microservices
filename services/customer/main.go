package main

import (
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Customer struct {
	Id            uint   `json:"id"`
	Name          string `json:"name"`
	Description   string `json:"description"`
	Email         string `json:"email"`
	CreatedDate   string `json:"created_date"`
	Age           int    `json:"age"`
	DriverLicense string `json:"driver_license"`
}

var customers = []Customer{
	{Id: 0, Name: "Chel", Description: "Reliable", Email: "chel@gmail.com", CreatedDate: "23.02.2023", Age: 23, DriverLicense: "1234-4321"},
	{Id: 1, Name: "Amogus", Description: "Bad credit", Email: "amogus@gmail.com", CreatedDate: "23.02.2023", Age: 31, DriverLicense: "0000-5423"},
	{Id: 2, Name: "Sussy", Description: "Pretty sus", Email: "sussybaka@gmail.com", CreatedDate: "23.02.2023", Age: 27, DriverLicense: "6452-3456"},
}

func main() {
	router := gin.New()

	router.GET("/api/customers", func(c *gin.Context) {
		c.JSON(http.StatusOK, customers)
	})

	router.GET("/api/customers/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))

		if id < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
			return
		}

		for _, v := range customers {
			if v.Id == uint(id) {
				c.JSON(http.StatusOK, v)
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	})

	router.POST("/api/customers", func(c *gin.Context) {
		var customer Customer

		if err := c.BindJSON(&customer); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		// TODO: generate random id
		customer.Id = uint(rand.Intn(100))

		c.JSON(http.StatusOK, customer)
	})

	router.PATCH("/api/customers/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if id < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
			return
		}

		var customer Customer
		if err := c.BindJSON(&customer); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		for _, v := range customers {
			if v.Id == uint(id) {
				c.JSON(http.StatusOK, customer)
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	})

	router.DELETE("/api/customers/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if id < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
			return
		}

		for _, v := range customers {
			if v.Id == uint(id) {
				c.JSON(http.StatusOK, gin.H{"message": "deleted", "id": id})
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	})

	router.Run(":8080")
}
