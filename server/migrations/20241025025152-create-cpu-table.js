'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cpu', {
      cpuId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      partId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Never have multiple instances of a Cpu in a Part
        references: {
          model: 'Part',
          key: 'partId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      series: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      microarchitecture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coreFamily: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      socket: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coreCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      threadCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      performanceCoreClock: { // in MHz
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      performanceCoreBoostClock: { // in MHz
        type: Sequelize.FLOAT, 
        allowNull: false,
      },
      efficiencyCoreClock: { // Intel exclusive, hence nullable (AMD don't use e-cores)
        type: Sequelize.FLOAT, // in MHz
        allowNull: true,
      },
      efficiencyCoreBoostClock: { // Intel exclusive
        type: Sequelize.FLOAT, // in MHz
        allowNull: true,
      },
      lTwoCache: { // in MB
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lThreeCache: { // in MB
        type: Sequelize.INTEGER, 
        allowNull: true,
      },
      tdp: { // in W
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxTurboPower: { // Intel exclusive, in W
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      integrated: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memoryMax: { // in GB
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lithography: { // in nm
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      includedCooler: { // No need for a CPU Cooler if low-end build
        type: Sequelize.BOOLEAN,
        allowNull: false,
        },
      multithreading: { // Hyper-Threading if Intel
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Cpu');
  }
};
