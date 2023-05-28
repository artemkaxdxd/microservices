import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
  ],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
