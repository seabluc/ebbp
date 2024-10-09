const { DataTypes } = require('sequelize');
const Part = require('./Part');

class Cpu extends Part{}

Cpu.init({
  clockSpeed: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = Cpu;