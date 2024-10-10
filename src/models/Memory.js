'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    static associate(models) {
      // Associate function defines relationships between models, such as setting up foreign keys and defining cardinalities.
      //One Part has one Cpu
      Part.hasOne(models.Cpu, {
        foreignKey: 'partId', // foreign key in the Cpu table
        onDelete: 'CASCADE', // Ensures that if a Part is deleted, its Cpu will also be deleted
      });
    }
  }
  Part.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, // keyword, Sequelize instance that provides methods for defining models, making queries, and managing the connection.
      modelName: 'Part', // name used internally within Sequelize
      tableName: 'Part', // actual name of the table in the database
      // timestamps: true, // not needed i using .NOW
    }
  );
  return Part;
};