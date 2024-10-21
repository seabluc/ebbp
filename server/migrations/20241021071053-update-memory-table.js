'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Memory', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('Memory', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Memory', 'createdAt');
    await queryInterface.removeColumn('Memory', 'updatedAt'); 
  }
};
