import { Module } from '@nestjs/common';
import { CarController } from './car/car.controller';
import { CarModule } from './car/car.module';
import { CarService } from './car/car.service';

@Module({
  imports: [CarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
