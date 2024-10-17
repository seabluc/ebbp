const { DataTypes } = require('sequelize');
const Part = require('./Part');

class VideoCard extends Part{}

VideoCard.init({
  yee: {
    type: DataTypes.String,
    allowNull: false
  },
});

getModuleBuildInfo.exports = VideoCard;