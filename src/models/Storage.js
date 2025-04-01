import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class Storage extends Model { }

Storage.init(
  {
    storageId: {
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
    capacity: { // in GB
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    formFactor: { // 2.5", 3.5", M.2-2280, M.2-2230
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['2.5', '3.5', 'M.2230', 'M.2280']
          ],
        },
      },
    },
    type: { // SSD, HDD (RPM), Hybrid
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerGig: { // $#.## / GB
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    interface: { // SATA 6.0 GB/s or PCIe 5.0/4.0 X4
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['SATA 6.0 Gb/s', 'M.2 PCIe 5.0 X4', 'M.2 PCIe 4.0 X4',]
          ],
        },
      },
    },
    nvme: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'Storage',
    sequelize
  }
);

export default Storage;