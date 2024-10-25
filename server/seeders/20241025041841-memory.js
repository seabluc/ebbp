'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memory', [
      {
        memoryId: 1,
        partId: 16,
        memoryType: 'DDR4',
        speed: 3000,
        casLatency: 15,
        trueLatency: 10,
        capacity: 16,
        modules: '2 x 8 GB',
        pricePerGig: 2.499,
        formFactor: '288-pin DIMM (DDR4)',
        color: 'Black / Yellow',
        voltage: 1.35,
        heatSpreader: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        memoryId: 2,
        partId: 17,
        memoryType: 'DDR5',
        speed: 5600,
        casLatency: 36,
        trueLatency: 12.857,
        capacity: 32,
        modules: '2 x 16 GB',
        pricePerGig: 3.437,
        formFactor: '288-pin DIMM (DDR5)',
        color: 'Black',
        voltage: 1.25,
        heatSpreader: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        memoryId: 3,
        partId: 18,
        memoryType: 'DDR5',
        speed: 6400,
        casLatency: 32,
        trueLatency: 10,
        capacity: 32,
        modules: '2 x 16 GB',
        pricePerGig: 4.312,
        formFactor: '288-pin DIMM (DDR5)',
        color: 'White / Silver',
        voltage: 1.4,
        heatSpreader: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memory', null, {});
  }
};
