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
      Computer.hasMany(models.Memory, { // A computer can have many RAM modules
        foreignKey: 'memoryId',
        onDelete: 'CASCADE',
      });
      Computer.hasMany(models.Storage, { // A computer can have many storages
        foreignKey: 'storageId',
        onDelete: 'CASCADE',
      });
      Computer.hasOne(models.PowerSupply, {
        foreignKey: 'psuId',
        onDelete: 'CASCADE', 
      });
      // One-to-one because SLI/CF hasn't been supported since 2017 
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
        // autoIncrement: true,
      },
      isCompatible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isEfficient: {
        type: DataTypes.BOOLEAN,
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