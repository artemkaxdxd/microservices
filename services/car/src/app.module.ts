import { Module } from '@nestjs/common';
import { CarController } from './car/car.controller';
import { CarModule } from './car/car.module';
import { CarService } from './car/car.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as env from 'env-var';
import { Car } from './car/user.model';

@Module({
  imports: [
    CarModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env.get('POSTGRES_HOST').required().asString(),
      port: 5432,
      username: env.get('POSTGRES_USER').required().asString(),
      password: env.get('POSTGRES_PASSWORD').required().asString(),
      database: env.get('POSTGRES_DB').required().asString(),
      models: [
        Car
      ],
      autoLoadModels: true,
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
