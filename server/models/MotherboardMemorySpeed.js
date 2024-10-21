'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Suggest users to always check their mobo's QVL to be extra safe.
  class MotherboardMemorySpeed extends Model {
    static associate(models) {
      // one-to-many with Motherboard
      MotherboardMemorySpeed.belongsTo(models.Motherboard, {
        foreignKey: 'motherboardId',
        onDelete: 'CASCADE',
      });
    }
  }
  MotherboardMemorySpeed.init(
    {
      memorySpeedId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      motherboardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      memorySpeed: {
        type: DataTypes.STRING,
        allowNull: false,
        /* it is a bit difficult finding every supported memory speed for DDR4 and DDR5. Won't validate for now...
        validate: {
          isIn: {
            args: [
              [
                'DDR4-2400', 'DDR4-2666', 'DDR4-2933', 'DDR4-3000', 'DDR4-3200', 'DDR4-3600', 'DDR4-4000', 'DDR4-4400',
                'DDR5-',
              ],
            ],
            msg: 'Memory speed not found (must be one of the predefiend values).'
          },
        },
        */
      },
    },
    {
      sequelize,
      modelName: 'MotherboardMemorySpeed',
      tableName: 'MotherboardMemorySpeed',
    }
  );
  return MotherboardMemorySpeed;
};