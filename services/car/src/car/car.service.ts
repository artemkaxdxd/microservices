import { Injectable } from '@nestjs/common';
import { CarFilterDto } from './dto/filter.dto';
import { Car } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car) private carRepository: typeof Car,
  ) {}

  async getAllCars(): Promise<Car[]> {
  return await this.carRepository.findAll({
    where: { },
    include: { all: true },
  });
  }

  async getCarById(carId: number): Promise<Car> {
    return await this.carRepository.findOne({
      where: { id: carId },
      include: { all: true },
    });
    
  }

  async addCar(carInfo: CarDto): Promise<Car> {
    return await this.carRepository.create(carInfo);
  }

  async updateCar(carId: number, car: CarDto): Promise<Car> {
    await this.carRepository.update(
      { ...car},
      {
        where: { id: carId },
      }
    );

    return await this.carRepository.findOne({
      where: { id: carId },
      include: { all: true },
    });
  }

  async deleteCar(carId: number): Promise<string> {
    await this.carRepository.destroy({
      where: { id: carId },
    });

    return `Car by id: ${carId} was deleted`;
  }

}
