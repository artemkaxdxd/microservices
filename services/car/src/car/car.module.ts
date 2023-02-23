import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
