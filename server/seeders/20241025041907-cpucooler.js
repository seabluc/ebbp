'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CpuCooler', [
      {
        cpuCoolerId: 1,
        partId: 23,
        fanRPM: 2400,
        noiseLevel: 37,
        color: 'White',
        radiatorSize: 360,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        partId: 24,
        fanRPM: 1400,
        noiseLevel: 21.4,
        color: 'Black',
        height: 159,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CpuCooler', null, {});
  }
};
