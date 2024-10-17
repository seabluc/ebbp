'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Computer extends Model {
    static associate(models) {
      
      Computer.hasOne(models.Cpu, {
        foreignKey: 'cpuId',
        onDelete: 'CASCADE',
      });
      Computer.hasOne(models.CpuCooler, {
        foreignKey: 'cpuCoolerId',
        onDelete: 'CASCADE',
      });
      Computer.hasOne(models.Motherboard, {
        foreignKey: 'motherboardId',
        onDelete: 'CASCADE',
      });
      Computer.hasMany(models.Memory, { // A computer can have many memory modules
        foreignKey: 'memoryId',
        onDelete: 'CASCADE',
      });
      Computer.hasMany(models.Storage, { // A computer can have many storage devices
        foreignKey: 'storageId',
        onDelete: 'CASCADE',
      });
      Computer.hasOne(models.PowerSupply, {
        foreignKey: 'psuId',
        onDelete: 'CASCADE', 
      });
      // Although a computer may have many video cards, SLI/CF has not been supported in years.
      Computer.hasOne(models.VideoCard, {
        foreignKey: 'videoCardId',
        onDelete: 'CASCADE',
      });
    }
  }
  Computer.init(
    {
      computerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isCompatible: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isEfficient: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize, 
      modelName: 'Computer', 
      tableName: 'Computer',
    }
  );
  return Computer;
};