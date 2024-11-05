'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cpu extends Model {
    static associate(models) {
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
        // autoIncrement: true,
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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      performanceCoreBoostClock: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      efficiencyCoreClock: { // Intel exclusive, hence nullable
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      efficiencyCoreBoostClock: { // Intel exclusive
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      lTwoCache: { // in MB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lThreeCache: { // in MB
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tdp: { // in W
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxTurboPower: { // Intel exclusive
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      integrated: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memoryMax: { // in GB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lithography: { // in nm
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      includedCooler: { // No need for a CPU Cooler if low-end build
      type: DataTypes.BOOLEAN,
      allowNull: false,
      },
      multithreading: { // Hyper-Threading if Intel
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cpu',
      tableName: 'Cpu',
    }
  );
  return Cpu;
};