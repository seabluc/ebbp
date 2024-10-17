'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Motherboard extends Model {
    static associate(models) {
      // one-to-one with Computer table
      Motherboard.hasOne(models.Computer, {
        foreignKey: 'motherboardId', // Computer's Fk, Motherboard's PK
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
        autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNukk: false,
        unique: true,
      },
      yee: {
        type: DataTypes.String,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
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