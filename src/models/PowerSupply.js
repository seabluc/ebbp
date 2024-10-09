const { DataTypes } = require('sequelize');
const Part = require('./Part');

class PowerSupply extends Part{}

PowerSupply.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = PowerSupply;