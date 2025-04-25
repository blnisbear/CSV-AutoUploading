package models

type ComputerList struct {
	ID         uint   `gorm:"primaryKey;column:id"`
	Username   string `gorm:"type:varchar(100);column:username"`
	Department string `gorm:"column:department"`
	License    string `gorm:"column:license"`
	Installed  string `gorm:"column:installed"`
	Brand      string `gorm:"column:brand"`
	Model      string `gorm:"column:model"`
	Serial     string `gorm:"column:serial"`
}
