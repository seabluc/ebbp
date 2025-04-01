import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class MotherboardMemorySpeed extends Model { }

MotherboardMemorySpeed.init(
  {
    memorySpeedId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    /*
    motherboardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    */
    memorySpeed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'MotherboardMemorySpeed',
    freezeTableName: true,
    sequelize
  }
);

export default MotherboardMemorySpeed;