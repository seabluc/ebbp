'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PowerSupply extends Model {
    static associate(models) {
      PowerSupply.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE',
      });
    }
  }
  PowerSupply.init(
    {
      psuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      formFactor: { // omit Flex ATX, Mini ITX, and TFX.
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['ATX', 'SFX',],
            ],
          },
        },
      },
      efficiency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['80+', '80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum', '80+ Titanium',],
            ],
          },
        },
      },
      modularity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['Fully modular', 'Semi-modular', 'Non-modular',],
            ],
          },
        },
      },
      wattage: { // in W
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      length: { // in mm
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: { // nullable, rather useless spec...
        type: DataTypes.STRING,
        allowNull: true,
      },
      atxFourConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      epsEightConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieTwelvePlusFourConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieTwelveConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieEightConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieSixPlusTwoConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieSixConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sataConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      molexFourConn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PowerSupply',
      tableName: 'PowerSupply',
    }
  );
  return PowerSupply;
};