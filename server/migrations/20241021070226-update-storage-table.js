'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Storage', 'memoryId', 'storageId');
    await queryInterface.addColumn('Storage', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('Storage', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Storage', 'storageId', 'memoryId');
    await queryInterface.removeColumn('Storage', 'createdAt');
    await queryInterface.removeColumn('Storage', 'updatedAt'); 
  }
};
