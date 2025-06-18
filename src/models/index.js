import sequelize from '@/lib/db';
import Part from './Part';
import Cpu from './Cpu';
import Motherboard from "./Motherboard";
import MotherboardMemorySpeed from './MotherboardMemorySpeed';
import Memory from './Memory';
import Storage from './Storage';
import VideoCard from './VideoCard';
import CpuCooler from './CpuCooler';
import CpuCoolerSocket from './CpuCoolerSocket';
import PowerSupply from './PowerSupply';

const associations = () => {
  Part.hasOne(Cpu, { foreignKey: 'partId', onDelete: "CASCADE" });
  Cpu.belongsTo(Part, { foreignKey: 'partId' });

  Part.hasOne(Motherboard, { foreignKey: 'partId', onDelete: "CASCADE" });
  Motherboard.belongsTo(Part, { foreignKey: 'partId' });
  Motherboard.hasMany(MotherboardMemorySpeed, { foreignKey: 'motherboardId', onDelete: "CASCADE", as: 'MotherboardMemorySpeeds' });
  MotherboardMemorySpeed.belongsTo(Motherboard, { foreignKey: 'motherboardId' })

  Part.hasOne(Memory, { foreignKey: 'partId', onDelete: "CASCADE" });
  Memory.belongsTo(Part, { foreignKey: 'partId' });

  Part.hasOne(Storage, { foreignKey: 'partId', onDelete: "CASCADE" });
  Storage.belongsTo(Part, { foreignKey: 'partId' });

  Part.hasOne(VideoCard, { foreignKey: 'partId', onDelete: "CASCADE" });
  VideoCard.belongsTo(Part, { foreignKey: 'partId' });

  Part.hasOne(CpuCooler, { foreignKey: 'partId', onDelete: "CASCADE" });
  CpuCooler.belongsTo(Part, { foreignKey: 'partId' });
  CpuCooler.hasMany(CpuCoolerSocket, { foreignKey: 'cpuCoolerId', onDelete: "CASCADE", as: 'CpuCoolerSockets' });
  CpuCoolerSocket.belongsTo(CpuCooler, { foreignKey: 'cpuCoolerId' });

  Part.hasOne(PowerSupply, { foreignKey: 'partId', onDelete: "CASCADE" });
  PowerSupply.belongsTo(Part, { foreignKey: 'partId' });

  //console.log(sequelize.models);
  console.log(Object.keys(sequelize.models));
};

associations();

export {
  sequelize,
  Part,
  Cpu,
  Motherboard,
  MotherboardMemorySpeed,
  Memory,
  Storage,
  VideoCard,
  CpuCooler,
  CpuCoolerSocket,
  PowerSupply
};