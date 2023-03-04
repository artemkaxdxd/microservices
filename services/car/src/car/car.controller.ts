import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { Car, CarDto } from './dto/car.dto';

@Controller('api/car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getAllCars(): Promise<Car[]> {
    return this.carService.getAllCars();
  }

  @Get(':id')
  async getCarById(@Param('id') orderId: string): Promise<Car> {
    return this.carService.getCarById(+orderId);
  }

  @Post()
  // add guard for check type of user
  async addCar(@Body() carInfo: CarDto): Promise<Car> {
    return this.carService.addCar(carInfo);
  }

  @Put(':id')
  // add guard for check type of user
  async updateCar(@Param('id') carId: string, @Body() car: CarDto) {
    return this.carService.updateCar(+carId, car);
  }

  @Delete(':id')
  // add guard for check type of user
  async deleteCar(@Param('id') carId: string): Promise<string> {
    return this.carService.deleteCar(+carId);
  }
}
