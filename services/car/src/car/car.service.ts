import { Injectable } from '@nestjs/common';
import { Car, CarDto } from './dto/car.dto';
import { CarFilterDto } from './dto/filter.dto';

@Injectable()
export class CarService {
  constructor() {}

  async getAllCars(): Promise<Car[]> {
    return [
      {
        id: 1,
        brand: "volvo",
        model: "s90",
        license: "ak9265ak",
        year: 2020,
        mileage: 9000,
        colour: "black",
        hp: 248,
        consumptionCity: 6.9,
        engineCapacity: 2,
        transmission: "manual",
        fuelType: "petrol",
        accident: false,
        description: "",
      },
      {
        id: 2,
        brand: "audi",
        model: "a4",
        license: "ak9266ak",
        year: 2019,
        mileage: 9000,
        colour: "blue",
        hp: 250,
        consumptionCity: 7.0,
        engineCapacity: 2,
        transmission: "automatic",
        fuelType: "petrol",
        accident: true,
        description: "",
      },
      {
        id: 3,
        brand: "bmw",
        model: "320i",
        license: "ak9267ak",
        year: 2022,
        mileage: 50000,
        colour: "black",
        hp: 187,
        consumptionCity: 6.0,
        engineCapacity: 2,
        transmission: "automatic",
        fuelType: "diesel",
        accident: false,
        description: "",
      },
    ]
  }

  async getCarById(carId: number): Promise<Car> {
    return {
        id: carId,
        brand: "volvo",
        model: "s90",
        license: "ak9265ak",
        year: 2020,
        mileage: 9000,
        colour: "black",
        hp: 248,
        consumptionCity: 6.9,
        engineCapacity: 2,
        transmission: "manual",
        fuelType: "petrol",
        accident: false,
        description: "",
      }
    
  }

  async addCar(carInfo: CarDto): Promise<Car> {
    // todo: database function for create
    const newCar: Car = {
      id: 1,
      ...carInfo
    }
    return newCar;
  }

  async updateCar(carId: number, car: CarDto): Promise<Car> {
    return {id: carId, ...car};
  }

  async deleteCar(carId: number): Promise<string> {
    return `Car by id: ${carId} was deleted`;
  }

}
