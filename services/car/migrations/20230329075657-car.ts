import {QueryInterface} from "sequelize";
import {Sequelize_migration} from "../util/inteface";


export const up = async (queryInterface: QueryInterface, Sequelize: Sequelize_migration) => {
  await queryInterface.createTable('car', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: Sequelize.STRING,
    model: Sequelize.STRING,
    brand: Sequelize.STRING,
    license: Sequelize.STRING,
    year: Sequelize.INTEGER,
    mileage: Sequelize.INTEGER,
    colour: Sequelize.STRING,
    hp: Sequelize.INTEGER,
    consumptionCity: Sequelize.INTEGER,
    engineCapacity: Sequelize.INTEGER,
    transmission: Sequelize.STRING,
    fuelType: Sequelize.STRING,
    accident: Sequelize.BOOLEAN,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  })
}

export const down = async (
  queryInterface: QueryInterface, _Sequelize: Sequelize_migration) => {
  await queryInterface.dropTable('car', {});
}
