const { DataTypes } = require('sequelize');
const Part = require('./Part');

class Storage extends Part{}

Storage.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = Storage;