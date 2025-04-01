'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Test', [
      {
        testId: 1,
        firstName: 'sean',
        lastName: 'ghim',
        email: 'wawaweewa@dmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testId: 2,
        firstName: 'bubba',
        lastName: 'G',
        email: 'hello@world.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Test', null, {});
  }
};