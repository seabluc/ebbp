'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memory', [
      {
        partId: 16,
        speed: 'DDR4-3000',
        casLatency: 15,
        trueLatency: '10 ns',
        timing: '15-17-17-35',
        modules: '2 x 8 GB',
        pricePerGig: '$2.499',
        formFactor: '288-pin DIMM (DDR4)',
        color: 'Black / Yellow',
        voltage: '1.35 V',
        heatSpreader: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partId: 17,
        speed: 'DDR5-5600',
        casLatency: 36,
        trueLatency: '12.857 ns',
        timing: '36-36-36-76',
        modules: '2 x 16 GB',
        pricePerGig: '$3.437',
        formFactor: '288-pin DIMM (DDR5)',
        color: 'Black',
        voltage: '1.25 V',
        heatSpreader: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partId: 18,
        speed: 'DDR5-6400',
        casLatency: 32,
        trueLatency: '10 ns',
        timing: '32-40-40-84',
        modules: '2 x 16 GB',
        pricePerGig: '$4.312',
        formFactor: '288-pin DIMM (DDR5)',
        color: 'White / Silver',
        voltage: '1.4 V',
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
