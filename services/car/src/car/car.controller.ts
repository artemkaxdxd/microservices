import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { Car, CarDto } from './dto/car.dto';

@Controller('api/car')
export class CarController {
  constructor(private readonly carService: CarService, private isFreeze: boolean = false) {}

  private delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  } 

  @Get()
  async getAllCars(): Promise<Car[]> {
    return this.carService.getAllCars();
  }

  @Get(':id')
  async getCarById(@Param('id') orderId: string): Promise<Car> {
    if (this.isFreeze) {
      await this.delay(10000);
    }
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

  @Post("/freeze")
  // add guard for check type of user
  async freeze(): Promise<string> {
    this.isFreeze = true;
    return "Frozen now"
  }
}
