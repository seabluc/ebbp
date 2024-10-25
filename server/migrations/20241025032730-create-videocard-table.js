'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VideoCard", {
      videoCardId: {
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
      chipset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memory: { // in GB
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      memoryType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['GDDR6X', 'GDDR6', 'GDDR5X', 'GDDR5',],
            ]
          },
        },
      },
      coreClock: { // in MHz
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boostClock: { // in MHz
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      effectiveMemoryClock: { // seems to only exist post 20 family
        type: Sequelize.INTEGER, // in MHz
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      frameSync: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['G-Sync', 'FreeSync',],
            ],
          },
        },
      },
      length: { // in mm
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tdp: { // in W
        type: Sequelize.INTEGER,
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
