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
        autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      }, 
      speed: { // DDR#-#### MHz ... can I validate this given there are only a set amount of memory speeds? find out what they all are?
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
        // Z790-E mobo only allowed 288-pin DIMM (DDR5) [formFactor] w/ 2380 compatible products.
        // The 288-pin DIMM (DDR5) Modules available/compatible for this mobo are:
        // 1 x 2GB -> 1 product OMIT OMIT OMIT OMIT OMIT
        // 1 x 8GB -> 75 products
        // 1 x 16GB -> 354 products
        // 2 x 8GB -> 94 products
        // 1 x 24GB -> 15 products
        // 1 x 32GB -> 168 products
        // 2 x 16GB -> 1035 products (still 1035 evn w/ no CPU)
        // 1 x 48GB -> 10 products 
        // 2 x 24GB -> 139 products
        // 2 x 32GB -> 390 products
        // 4 x 16GB -> 25 products
        // 2 x 48GB -> 62 products
        // 4 x 24GB -> 6 products
        // 4 x 32GB -> 6 products
        

        // i dont think ill include any memory products that are < 8gb
        // ill also likely omit products where there are > 4 modules and omit
        // products that exceed 192GB, which are 4x64GB, 8x32GB, 8x48GB, 8x64GB
        type: DataTypes.STRING,
        allowNull: false,
        /*
        validate: {
          isIn: {
            args: [
              []
            ]
          }
        }
          */
      },
      pricePerGig: {
        type: DataTypes.STRING,
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
      voltage: {
        type: DataTypes.STRING,
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