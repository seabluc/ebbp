'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VideoCard', [
      {
        videoCardId: 1,
        partId: 28,
        chipset: 'GeForce RTX 4090',
        memory: 24,
        memoryType: 'GDDR6X',
        coreClock: 2235,
        effectiveMemoryClock: 21000,
        color: 'Black / Silver',
        frameSync: 'G-Sync', // Intel = G-Sync
        length: 336,
        tdp: 450,
        caseSlotWidth: 3,
        totalSlotWidth: 4,
        coolingFan: 3,
        externalPower: '1 PCIe 16-pin',
        dpOutput: 3,
        hdmiOutput: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        videoCardId: 2,
        partId: 29,
        chipset: 'Radeon RX-79XMERCB9',
        memory: 24,
        memoryType: 'GDDR6',
        coreClock: 2300,
        boostClock: 2615,
        color: 'Black / Silver',
        frameSync: 'FreeSync', // AMD = FreeSync
        length: 344,
        tdp: 355,
        caseSlotWidth: 2,
        totalSlotWidth: 3,
        coolingFan: 3,
        externalPower: '3 PCIe 8-pin',
        dpOutput: 3,
        hdmiOutput: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        videoCardId: 3,
        partId: 30,
        chipset: 'GeForce RTX 3060 12GB',
        memory: 12,
        memoryType: 'GDDR6',
        coreClock: 1320,
        boostClock: 1777,
        effectiveMemoryClock: 15000,
        color: 'Black',
        frameSync: 'G-Sync', // Intel = G-Sync
        length: 235,
        tdp: 170,
        caseSlotWidth: 2,
        totalSlotWidth: 2,
        coolingFan: 2,
        externalPower: '1 PCIe 8-pin',
        dpOutput: 3,
        hdmiOutput: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VideoCard', null, {});
  }
};
