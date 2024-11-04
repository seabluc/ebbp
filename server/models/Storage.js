'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Storage extends Model {
    static associate(models) {
      // one-to-one with Part
      Storage.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE',
      });
    }
  }
  Storage.init(
    {
      storageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      capacity: { // in GB or TB
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      formFactor: { // in inches or M.2 dimensions in mm..? verify with PcPP
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: { // validate: if it's hdd then format will be ####RPM. if not, then 'SSD' but verify with how PcPP handles this spec
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricePerGig: { // $#.## / gb
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      interface: { // SATA 6.0 GB/s or PCIe 5.0/4.0 X4/X2
        type: DataTypes.STRING,
        allowNull: false,
      },
      nvme: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Storage',
      tableName: 'Storage',
    }
  );
  return Storage;
};