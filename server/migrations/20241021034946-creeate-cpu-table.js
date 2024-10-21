'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cpu', {
      cpuId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      performanceCoreClock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      performanceCoreBoostClock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      efficiencyCoreClock: { // Intel exclusive, hence nullable
        type: Sequelize.STRING,
        allowNull: true,
      },
      efficiencyCoreBoostClock: { // Intel exclusive
        type: Sequelize.STRING,
        allowNull: true,
      },
      lTwoCache: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lThreeCache: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tdp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      maxTurboPower: { // Intel exclusive
        type: Sequelize.STRING,
        allowNull: true,
      },
      integrated: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memoryMax: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lithography: {
        type: Sequelize.STRING,
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
