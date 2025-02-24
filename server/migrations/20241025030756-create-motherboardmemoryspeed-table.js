'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MotherboardMemorySpeed', {
      memorySpeedId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      motherboardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Motherboard',
          key: 'motherboardId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      memorySpeed: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('MotherboardMemorySpeed');
  }
};
