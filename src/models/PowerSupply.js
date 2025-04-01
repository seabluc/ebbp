import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class PowerSupply extends Model { }

PowerSupply.init(
  {
    psuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    /*
    partId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    */
    formFactor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['ATX', 'SFX'],
          ],
        },
      },
    },
    efficiency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['80+', '80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum', '80+ Titanium'],
          ],
        },
      },
    },
    modularity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['Fully-modular', 'Semi-modular', 'Non-modular'],
          ],
        },
      },
    },
    wattage: { // in W
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    length: { // in mm
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: { // weird spec bruh its a PSU 
      type: DataTypes.STRING,
      allowNull: true,
    },
    atxFourConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    epsEightConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieTwelvePlusFourConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieTwelveConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieEightConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieSixPlusTwoConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieSixConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sataConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    molexFourConn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'PowerSupply',
    sequelize
  }
);

export default PowerSupply;