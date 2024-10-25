'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Motherboard extends Model {
    static associate(models) {
      Motherboard.hasMany(models.MotherboardMTwoSlot, {
        foreignKey: 'motherboardId',
        onDelete: 'CASCADE',
      });
      Motherboard.hasMany(models.MotherboardMemorySpeed, {
        foreignKey: 'motherboardId',
        onDelete: 'CASCADE',
      });
      // one-to-one with Part table (by making Motherboard's partId FK unique)
      Motherboard.belongsTo(models.Part, {
        foreignKey: 'partId', // Motherboard's partId (FK)
        onDelete: 'CASCADE',
      });
    }
  }
  Motherboard.init(
    {
      motherboardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      socket: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      formFactor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chipset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memoryMax: { // in GB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      memoryType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['DDR4', 'DDR5']],
          },
        }
      },
      memorySlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pcieSixteenSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieEightSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieFourSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieOneSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pcieSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sataSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      onboardEthernet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onboardVideo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usbTwoHeader: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usbTwoHeaderSinglePort: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenOneHeader: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenTwoHeader: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenTwoByTwoHeader: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wirelessNetworking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      raidSupport: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      backConnectors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Motherboard',
      tableName: 'Motherboard',
    }
  );
  return Motherboard;
};