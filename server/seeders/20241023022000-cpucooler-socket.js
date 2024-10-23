'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CpuCoolerSocket', [
      {
        cpuCoolerId: 1,
        socket: 'AM4',
      },
      {
        cpuCoolerId: 1,
        socket: 'AM5',
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1200',
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1700',
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1851',
      },
      {
        cpuCoolerId: 2,
        socket: 'AM4',
      },
      {
        cpuCoolerId: 2,
        socket: 'AM5',
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1200',
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1700',
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1851',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CpuCoolerSocket', null, {});
  }
};
