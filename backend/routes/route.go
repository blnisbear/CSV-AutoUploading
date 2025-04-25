package routes

import (
	"examtoppan/controllers"

	"github.com/gin-gonic/gin"

	"examtoppan/middleware"
)

func SetupRoutes(r *gin.Engine) {

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	r.POST("/upload", middleware.RequireAuth(), controllers.UploadCSV)
	r.GET("/computers", middleware.RequireAuth(), controllers.GetDataComputerList)
}
