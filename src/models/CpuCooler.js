const { DataTypes } = require('sequelize');
const Part = require('./Part');

class CpuCooler extends Part{}

CpuCooler.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = CpuCooler;