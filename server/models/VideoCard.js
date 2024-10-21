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
        autoIncrement: true,
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
      memory: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      memoryType: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      coreClock: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      boostClock: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      effectiveMemoryClock: { // seems to only exist in models post 20 family
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      frameSync: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      length: { // in mm
        type: DataTypes.STRING,
        allowNull: false,
      },
      tdp: { 
        type: DataTypes.STRING,
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