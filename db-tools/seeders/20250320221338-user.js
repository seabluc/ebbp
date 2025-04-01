'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [
      {
        userId: 1,
        testId: 1,
        username: 'bungus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        testId: 2,
        username: 'nortfite',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
