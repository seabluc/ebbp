'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MotherboardMemorySpeed', [
      {
        motherboardId: 1,
        memorySpeed: 'DDR5-4800',
      },
      {
        motherboardId: 1,
        memorySpeed: 'DDR5-6400',
      },
      {
        motherboardId: 1,
        memorySpeed: 'DDR5-8800',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-4800',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-5200',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-5600',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-6000',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-6200',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-6400',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-6600',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-6800',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-7000',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-7200',
      },
      {
        motherboardId: 2,
        memorySpeed: 'DDR5-8200',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR5-2133',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-2400',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-2666',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-2933',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3000',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3200',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3300',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3333',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3400',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3466',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3600',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3733',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-3866',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4000',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4133',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4200',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4266',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4300',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4400',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4533',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4600',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4800',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-4866',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-5000',
      },
      {
        motherboardId: 3,
        memorySpeed: 'DDR4-5100',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-4800',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-5000',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-5200',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-5400',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-5600',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-5800',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-6000',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-6200',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-6400',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-6600',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-6800',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-7000',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-7200',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-7400',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-7600',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-7800',
      },
      {
        motherboardId: 4,
        memorySpeed: 'DDR5-8000',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MotherboardMemorySpeed', null, {});
  }
};