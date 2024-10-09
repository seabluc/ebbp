const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Part extends Model {}

Part.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /* while the URL is crucial for PyPartPicker, I don't its use in our database
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  */ 
  /* same for type, since the tables are named after their respective component
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },*/
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}/*, {
  sequelize, 
  modelName: 'Part',
  timestamps: false
}*/);

getModuleBuildInfo.exports = Part;