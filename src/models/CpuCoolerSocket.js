import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class CpuCoolerSocket extends Model { }

CpuCoolerSocket.init(
  {
    coolerSocketId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    /*
    cpuCoolerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    */
    socket: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['AM4', 'AM5', 'LGA1700', 'LGA1851'],
          ],
          msg: "EBBP only support the following sockets: AM4, AM5, LGA1700, and LGA1851."
        },
      },
    },
  },
  {
    tableName: 'CpuCoolerSocket',
    sequelize
  }
);

export default CpuCoolerSocket;