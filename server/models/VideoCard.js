'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VideoCard extends Model {
    static associate(models) {
      // one-to-one with Part
      VideoCard.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE',
      });
    }
  }
  VideoCard.init(
    {
      videoCardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      chipset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memory: { // in GB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      memoryType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['GDDR6X', 'GDDR6', 'GDDR5X', 'GDDR5',],
            ]
          },
        },
      },
      coreClock: { // in MHz
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boostClock: { // in MHz - apparently nullable (not present in RTX 4090???)
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      effectiveMemoryClock: { // in MHz - seems to only exist post 20 family
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frameSync: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['G-Sync', 'FreeSync',],
            ],
          },
        },
      },
      length: { // in mm
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tdp: { // in W
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      caseSlotWidth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalSlotWidth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coolingFan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      externalPower: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dpOutput: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hdmiOutput: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'VideoCard',
      tableName: 'VideoCard',
    }
  );
  return VideoCard;
};