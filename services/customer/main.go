package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// var customers = []Customer{
// 	{Id: 0, Name: "Chel", Description: "Reliable", Email: "chel@gmail.com", CreatedDate: "23.02.2023", Age: 23, DriverLicense: "1234-4321"},
// 	{Id: 1, Name: "Amogus", Description: "Bad credit", Email: "amogus@gmail.com", CreatedDate: "23.02.2023", Age: 31, DriverLicense: "0000-5423"},
// 	{Id: 2, Name: "Sussy", Description: "Pretty sus", Email: "sussybaka@gmail.com", CreatedDate: "23.02.2023", Age: 27, DriverLicense: "6452-3456"},
// }

func main() {
	server := &Server{}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s", "localhost", "postgres", "root", "postgres")
	//dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s", os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"))

	server.Init(dsn)

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	server.Gin.Use(cors.New(corsConfig))
	server.Gin.Use(gin.Logger())

	// server.Gin.GET("/api/customers", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, customers)
	// })

	// server.Gin.GET("/api/customers/:id", func(c *gin.Context) {
	// 	id, _ := strconv.Atoi(c.Param("id"))

	// 	if id < 0 {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
	// 		return
	// 	}

	// 	for _, v := range customers {
	// 		if v.Id == uint64(id) {
	// 			c.JSON(http.StatusOK, v)
	// 			return
	// 		}
	// 	}

	// 	c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	// })

	//server.Gin.GET("/api/customers",server.GetCustomer)
	server.Gin.GET("/api/customers/:id", server.GetCustomerById)
	server.Gin.POST("/api/customers", server.AddCustomer)
	//server.Gin.PATCH("/api/customers/:id", server.UpdateCustomer)
	//server.Gin.DELETE("/api/customers/:id", server.DeleteCustomer)

	// server.Gin.PATCH("/api/customers/:id", func(c *gin.Context) {
	// 	id, _ := strconv.Atoi(c.Param("id"))
	// 	if id < 0 {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
	// 		return
	// 	}

	// 	var customer Customer
	// 	if err := c.BindJSON(&customer); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	// 		return
	// 	}

	// 	for _, v := range customers {
	// 		if v.Id == uint64(id) {
	// 			c.JSON(http.StatusOK, customer)
	// 			return
	// 		}
	// 	}

	// 	c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	// })

	// server.Gin.DELETE("/api/customers/:id", func(c *gin.Context) {
	// 	id, _ := strconv.Atoi(c.Param("id"))
	// 	if id < 0 {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id should be >= 0"})
	// 		return
	// 	}

	// 	for _, v := range customers {
	// 		if v.Id == uint64(id) {
	// 			c.JSON(http.StatusOK, gin.H{"message": "deleted", "id": id})
	// 			return
	// 		}
	// 	}

	// 	c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	// })

	server.Gin.Run(":8080")
}
