package main

type Customer struct {
	Id            uint64 `json:"id" gorm:"primaryKey"`
	Name          string `json:"name"`
	Description   string `json:"description"`
	Email         string `json:"email"`
	CreatedDate   string `json:"created_date"`
	Age           int    `json:"age"`
	DriverLicense string `json:"driver_license"`
}
