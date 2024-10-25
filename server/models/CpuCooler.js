  // a gud practice is to unironically copy paste all of my models to chatgpt so it can detect types. i always seem to spell foreignKey as foreignkey
'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CpuCooler extends Model {
    static associate(models) {
      CpuCooler.hasMany(models.CpuCoolerSocket, {
        foreignKey: 'cpuCoolerId',
        onDelete: 'CASCADE',
      });
      CpuCooler.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE',
      });
    }
  }

  CpuCooler.init(
    {
      cpuCoolerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
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
      height: { // in mm, but only for air coolers, hence nullable
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      radiatorSize: { // in mm, create validation for acceptable sizes (refer to PyPartPicker CpuCooler script for which dimensions we'll be favoring)
        type: DataTypes.INTEGER, // given the different variations, might either validate or create a new table like CpuWaterCooler. leaning towards validate instead
        allowNull: true, 
      }
    },
    {
      sequelize,
      modelName: 'CpuCooler',
      tableName: 'CpuCooler',
    }
  );
  return CpuCooler;
};