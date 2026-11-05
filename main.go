package main

import (
	"go-url-shortner/config"
	"go-url-shortner/models"
	"go-url-shortner/routes"
	"os"
)

func main() {
	config.ConnectDB()

	config.DB.AutoMigrate(&models.Url{})

	r := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
