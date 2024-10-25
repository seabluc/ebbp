'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    // Associate function defines relationships between models, 
    // such as setting up foreign keys and defining cardinalities.
    static associate(models) {
      // Each component is unique due to specs such as part number. Therefore,
      // Part will have a one-to-one relationship with every component/table.
      Part.hasOne(models.Cpu,  {
        foreignKey: 'partId', // FK in Cpu table
        onDelete: 'CASCADE', // if a Part is deleted, its Cpu will be deleted
      });
      Part.hasOne(models.CpuCooler, {
        foreignKey: 'partId', 
        onDelete: 'CASCADE', 
      });
      Part.hasOne(models.Motherboard, {
        foreignKey: 'partId', 
        onDelete: 'CASCADE', 
      });
      Part.hasOne(models.Memory, {
        foreignKey: 'partId', 
        onDelete: 'CASCADE', 
      });
      Part.hasOne(models.Storage, {
        foreignKey: 'partId', 
        onDelete: 'CASCADE', 
      });
      Part.hasOne(models.PowerSupply, {
        foreignKey: 'partId', 
        onDelete: 'CASCADE', 
      });
      Part.hasOne(models.VideoCard, {
        foreignKey: 'partId',
        onDelete: 'CASCADE', 
      });
    }
  }
  Part.init(
    {
      partId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
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
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      partNum: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize, // keyword, Sequelize instance that provides methods for defining models, making queries, and managing the connection.
      modelName: 'Part', // name used internally within Sequelize
      tableName: 'Part', // actual name of the table in the database
      // timestamps: true, // not needed when using Sequelize.NOW
    }
  );
  return Part;
};