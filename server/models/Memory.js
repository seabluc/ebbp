'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Memory extends Model {
    static associate(models) {
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
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      memoryType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['DDR4', 'DDR5',],
            ],
            msg: "EBBP only supports components compatible with DDR4 or DDR5."
          },
        },
      },
      // speed used to be a string: DDR#-#### MHz ... can I validate this given there are only a set amount of memory speeds? find out what they all are?
      speed: { // in MHz 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      casLatency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trueLatency: { // in ns
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      /*
      timing: { // omit for now
        type: DataTypes.STRING,
        allowNull: true,
      },
      */
      capacity: { // in GB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modules: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [1, 2,] /*
              (DDR4) - 1 x 8 GB, 1 x 16 GB, 1 x 32 GB, 2 x 8 GB, 2 x 16 GB, 2 x 32 GB  
              (DDR5) - 1 x 8 GB, 1 x 16 GB, 1 x 32 GB, 2 x 8 GB, 2 x 16 GB, 2 x 32 GB, 2 x 48 GB
            */
            ],
          },
        },
      },

      pricePerGig: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      formFactor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                '288-pin DIMM (DDR4)', '260-pin SODIMM (DDR4)',
                '288-pin DIMM (DDR5)', '288-pin SODIMM (DDR5)',
              ],
            ],
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      voltage: { // in V
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      heatSpreader: {
        type: DataTypes.BOOLEAN,
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