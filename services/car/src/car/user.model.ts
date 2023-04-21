import {
  Model,
  Table,
  Column,
  DataType,
} from 'sequelize-typescript';


@Table({ tableName: 'car' })
export class Car extends Model<Car> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
  id: number;

  @Column({ type: DataType.STRING })
  model: string;

  @Column({ type: DataType.STRING })
  brand: string;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.INTEGER })
  mileage: number;
  
  @Column({ type: DataType.INTEGER })
  hp: number;

  @Column({ type: DataType.STRING })
  description: string;
}
