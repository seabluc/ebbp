import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class Memory extends Model { }

Memory.init(
  {
    memoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    /*
    partId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Part',
        key: 'partId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    */
    memoryType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['DDR4', 'DDR5'],
          ],
          msg: "EBBP only supports components compatible with DDR4 or DDR5."
        },
      },
    },
    speed: { // in MHz 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    casLatency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trueLatency: { // in ns
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    capacity: { // in GB
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modules: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    pricePerGig: {
      type: DataTypes.FLOAT,
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
    voltage: { // in V
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    heatSpreader: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'Memory',
    sequelize
  }
);

export default Memory;