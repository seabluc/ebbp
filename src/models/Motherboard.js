import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class Motherboard extends Model { }

Motherboard.init(
  {
    motherboardId: {
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
    socket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formFactor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chipset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memoryMax: { // in GB
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    memoryType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['DDR4', 'DDR5']],
        },
      }
    },
    memorySlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pcieSixteenSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieEightSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieFourSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieOneSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pcieSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sataSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mTwoSlot: { // M.2-2280 M-key slots only
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onboardEthernet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    onboardVideo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usbTwoHeader: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usbTwoHeaderSinglePort: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usbThreeTwoGenOneHeader: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usbThreeTwoGenTwoHeader: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usbThreeTwoGenTwoByTwoHeader: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wirelessNetworking: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raidSupport: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    backConnectors: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'Motherboard',
    sequelize
  }
);

export default Motherboard;