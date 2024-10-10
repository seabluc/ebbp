'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cpu extends Model {
    static associate(models) {
      Cpu.hasOne(models.Part, {
        foreignKey: 'partId', // foreign key in the Cpu table
        onDelete: 'CASCADE', // Ensures that if a Part is deleted, its Cpu will also be deleted
      });
    }
  }
  Cpu.init(
    {
      series: {
        type: DataTypes.STRING,
      },
      architecture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coreFamily: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      socket: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coreCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      threadCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      performanceCoreClock: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      performanceCoreBoostClock: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      efficiencyCoreClock: { // Intel exclusive (Haven't seen AMD with these)
        type: DataTypes.STRING,
        allowNull: true,
      },
      efficiencyCoreBoostClock: { // Intel exclusive
        type: DataTypes.STRING,
        allowNull: true,
      },
      l2Cache: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      l3Cache: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tdp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maxTurboPower: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      integrated: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      memoryMax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eccSupport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lithography: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      multithreading: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize, // keyword, Sequelize instance that provides methods for defining models, making queries, and managing the connection.
      modelName: 'Cpu', // name used internally within Sequelize
      tableName: 'Cpu', // actual name of the table in the database
      // timestamps: true, // not needed i using .NOW
    }
  );
  return Cpu;
};