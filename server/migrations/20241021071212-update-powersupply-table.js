'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PowerSupply', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('PowerSupply', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PowerSupply', 'createdAt');
    await queryInterface.removeColumn('PowerSupply', 'updatedAt'); 
  }
};
