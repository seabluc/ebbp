'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CpuCoolerSocket', [
      {
        cpuCoolerId: 1,
        socket: 'AM4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 1,
        socket: 'AM5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1200',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1700',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 1,
        socket: 'LGA1851',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        socket: 'AM4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        socket: 'AM5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1200',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1700',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        socket: 'LGA1851',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CpuCoolerSocket', null, {});
  }
};

/* Template
{
  cpuCoolerId: int,
  socket: 'varChar',
  createdAt: new Date(),
  updatedAt: new Date(),
},
      {
        cpuCoolerId: int,
        socket: 'varChar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
*/