const { DataTypes } = require('sequelize');
const Part = require('./Part');

class Memory extends Part{}

Memory.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = Memory;