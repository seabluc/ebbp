'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cpu extends Model {
    static associate(models) {
      // one-to-one with Computer table
      Cpu.hasOne(models.Computer, {
        foreignKey: 'cpuId', // Computer's FK, Cpu's PK
        onDelete: 'CASCADE',
      });

      // one-to-one with Part table
      Cpu.belongsTo(models.Part, {
        foreignKey: 'partId', // Cpu's partId FK, and Cpu belongs to Part
        onDelete: 'CASCADE',
      });
    }
  }
  Cpu.init(
    {
      cpuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Never have multiple instances of a Cpu in a Part
      },
      series: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      microarchitecture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coreFamily: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socket: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coreCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      threadCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      performanceCoreClock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      performanceCoreBoostClock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      efficiencyCoreClock: { // Intel exclusive, hence nullable
        type: DataTypes.STRING,
        allowNull: true,
      },
      efficiencyCoreBoostClock: { // Intel exclusive
        type: DataTypes.STRING,
        allowNull: true,
      },
      lTwoCache: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lThreeCache: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tdp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxTurboPower: { // Intel exclusive
        type: DataTypes.STRING,
        allowNull: true,
      },
      integrated: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memoryMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lithography: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      multithreading: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Cpu',
      tableName: 'Cpu',
    }
  );
  return Cpu;
};