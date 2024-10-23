'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CpuCooler', [
      {
        cpuCoolerId: 1,
        partId: 23,
        fanRPM: '2400 RPM',
        noiseLevel: '37 dB',
        color: 'White',
        waterCooler: 'Yes (360 mm)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpuCoolerId: 2,
        partId: 24,
        fanRPM: '1400 RPM',
        noiseLevel: '21.4 dB',
        color: 'Black',
        height: '159 mm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CpuCooler', null, {});
  }
};
