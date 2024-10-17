'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Memory extends Model {
    static associate(models) {
      // one-to-one with Computer table
      Memory.hasOne(models.Computer, {
        foreignKey: 'memoryId', // Computer's Fk, Memory's PK
        onDelete: 'CASCADE', 
      });
      Memory.belongsTo(models.Part, {
        foreignKey: 'partId', // Memory's partId (FK), and Memory is a Part
        onDelete: 'CASCADE', 
      });
    }
  }
  Memory.init(
    {
      memoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      }, 
      speed: { // DDR#-#### MHz
        type: DataTypes.STRING,
        allowNull: false,
      },
      casLatency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trueLatency: { // ## ns
        type: DataTypes.STRING,
        allowNull: false,
      },
      timing: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modules: { // # x #GB
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricePerGig: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      formFactor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      voltage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heatSpreader: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Memory', 
      tableName: 'Memory',
    }
  );
  return Memory;
};