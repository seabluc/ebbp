'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CpuCooler', {
      cpuCoolerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      partId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Part',
          key: 'partId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fanRPM: { // in RPM (max RPM)
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noiseLevel: { // in decibels (dB)
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      height: { // in mm, but only for air coolers, hence nullable
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      radiatorSize: { // in mm, create validation for acceptable sizes (refer to PyPartPicker CpuCooler script for which dimensions we'll be favoring)
        type: Sequelize.INTEGER, // given the different variations, might either validate or create a new table like CpuWaterCooler. leaning towards validate instead
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CpuCooler');
  }
};
