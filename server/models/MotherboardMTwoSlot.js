'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MotherboardMTwoSlot extends Model {
    static associate(models) {
      // one-to-many with Motherboard
      MotherboardMTwoSlot.belongsTo(models.Motherboard, {
        foreignKey: 'motherboardId', // 
        onDelete: 'CASCADE',
      });
    }
  }
  MotherboardMTwoSlot.init(
    {
      mTwoSlotId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //autoIncrement: true,
      },
      motherboardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // validate or create more attributes to cover M.2 dimensions and M.2
      // slot keys (B key uses up to 2 PCIe lanes, M key can use up to 4 aka NVMe)
      mTwoSlot: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MotherboardMTwoSlot',
      tableName: 'MotherboardMTwoSlot',
    }
  );
  return MotherboardMTwoSlot;
};