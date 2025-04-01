import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class CpuCooler extends Model { }

CpuCooler.init(
  {
    cpuCoolerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    /*
    partId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    */
    fanRPM: { // in RPM (maximum RPM)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noiseLevel: { // in decibels (dB)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { // in mm, nullable - exclusive to air coolers
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    radiatorSize: { // in mm, nullable - exclusive to water coolers 
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: 'CpuCooler',
    sequelize
  }
);

export default CpuCooler;