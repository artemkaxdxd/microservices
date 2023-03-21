package main

import "time"

type Customer struct {
	Id            uint64    `json:"id" gorm:"primaryKey"`
	Name          string    `json:"name"`
	Description   string    `json:"description"`
	Email         string    `json:"email"`
	Age           int       `json:"age"`
	DriverLicense string    `json:"driver_license"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
