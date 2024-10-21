'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VideoCard", {
      videoCardId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      chipset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memoryType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coreClock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      boostClock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      effectiveMemoryClock: { // seems to only exist in models post 20 family
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frameSync: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      length: { // in mm
        type: Sequelize.STRING,
        allowNull: false,
      },
      tdp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      caseSlotWidth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalSlotWidth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coolingFan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      externalPower: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dpOutput: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hdmiOutput: {
        type: Sequelize.INTEGER,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VideoCard');
  }
};
