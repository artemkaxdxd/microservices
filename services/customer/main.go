package main

import (
	"fmt"
	"os"
)

func main() {
	server := &Server{}

	//dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s", "localhost", "postgres", "root", "postgres")
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s", os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"))

	server.Init(dsn)

	server.RegisterRoutes()

	server.Gin.Run(":8080")
}
