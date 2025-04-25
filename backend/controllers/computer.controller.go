package controllers

import (
	"examtoppan/db"
	"examtoppan/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetDataComputerList(c *gin.Context) {
	var computerList []models.ComputerList
	if err := db.DB.Find(&computerList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve computer list"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": computerList})
}
