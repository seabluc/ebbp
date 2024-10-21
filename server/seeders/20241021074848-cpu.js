'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cpu', [{
      partId: 1,
      name: 'Intel Core Ultra 9 285K',
      type: 'CPU',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/d658fbb8695607dc4964431e6b6b9373.256p.jpg',
      // price: '$629.99', UPDATE Part MIGRATION
      manufacturer: 'Intel',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
