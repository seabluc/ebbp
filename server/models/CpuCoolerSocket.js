// a gud practice is to unironically copy paste all of my models to chatgpt so it can detect types. i always seem to spell foreignKey as foreignkey
'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CpuCoolerSocket extends Model {
    static associate(models) {
      // one-to-many with CpuCooler
      CpuCoolerSocket.belongsTo(models.CpuCooler, {
        foreignKey: 'cpuCoolerId',
        onDelete: 'CASCADE',
      });
    }
  }
  CpuCoolerSocket.init(
    {
      coolerSocketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cpuCoolerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      socket: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['AM4', 'AM5', 'LGA1200', 'LGA1700', 'LGA1851',],
            ],
            msg: "All Motherboards and Cpus on EBBP are limited to AM4, AM5, LGA1200, LGA1700, and LGA1851 sockets."
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'CpuCoolerSocket',
      tableName: 'CpuCoolerSocket',
    }
  );
  return CpuCoolerSocket;
};