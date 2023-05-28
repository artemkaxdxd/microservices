import Sequelize from "sequelize";
import {DataType} from "sequelize-typescript";

export type Sequelize_migration = typeof DataType & {fn: typeof Sequelize.fn};