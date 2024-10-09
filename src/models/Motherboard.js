const { DataTypes } = require('sequelize');
const Part = require('./Part');

class Motherboard extends Part{}

Motherboard.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = Motherboard;