import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { Car, CarDto } from './dto/car.dto';
import { CarFilterDto } from './dto/filter.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(@Body() filter: CarFilterDto): Promise<Car[]> {
    return this.carService.getCars(filter);
  }

  @Post()
  // add guard for check type of user
  async addCar(@Body() carInfo: CarDto): Promise<Car> {
    return this.carService.addCar(carInfo);
  }

  @Put()
  // add guard for check type of user
  async updateCar(@Query('id') carId: number, @Body() car: CarDto) {
    return this.carService.updateCar(carId, car);
  }

  @Delete()
  // add guard for check type of user
  async deleteCar(@Query('id') carId: number): Promise<string> {
    return this.carService.deleteCar(carId);
  }
}
