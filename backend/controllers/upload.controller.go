package controllers

import (
	"encoding/csv"
	"examtoppan/db"
	"examtoppan/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadCSV(c *gin.Context) {
	// รับไฟล์จาก req
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}

	f, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot open file"})
		return
	}
	defer f.Close() //สั่งปิดไฟล์อัตโนมัติเมื่อฟังก์ชันนี้ return

	// อ่านข้อมูลจากไฟล์ CSV
	reader := csv.NewReader(f)
	reader.TrimLeadingSpace = true

	records, err := reader.ReadAll()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid CSV format"})
		return
	}

	//ถ้าจำนวน record น้อยกว่า 2 แถว
	if len(records) < 2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CSV must have at least 1 row of data"})
		return
	}

	// loop เพื่ออ่านข้อมูลทีละบรรทัด
	for i, row := range records {
		if i == 0 {
			continue
		}

		//ถ้าข้อมูลในไฟล์ csv มีน้อยกว่า 7 column
		if len(row) < 7 {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Row %d has missing fields", i+1)})
			return
		}

		computer := models.ComputerList{
			Username:   row[0],
			Department: row[1],
			License:    row[2],
			Installed:  row[3],
			Brand:      row[4],
			Model:      row[5],
			Serial:     row[6],
		}

		if err := db.DB.Create(&computer).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert row"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "CSV data imported successfully"})
}
