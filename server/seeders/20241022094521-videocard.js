'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VideoCard', [
      {
        partId: 28,
        chipset: 'GeForce RTX 4090',
        memory: '24 GB',
        memoryType: 'GDDR6X',
        coreClock: '2235 MHz',
        effectiveMemoryClock: '21000 MHZ',
        color: 'Black / Silver',
        frameSync: 'G-Sync', // Intel = G-Sync
        length: '336 mm',
        tdp: '450 W',
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
        partId: 29,
        chipset: 'Radeon RX-79XMERCB9',
        memory: '24 GB',
        memoryType: 'GDDR6',
        coreClock: '2300 MHz',
        boostClock: '2615 MHz',
        color: 'Black / Silver',
        frameSync: 'FreeSync', // AMD = FreeSync
        length: '344 mm',
        tdp: '355 W',
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
        partId: 30,
        chipset: 'GeForce RTX 3060 12GB',
        memory: '12 GB',
        memoryType: 'GDDR6',
        coreClock: '1320 MHz',
        boostClock: '1777 MHz',
        effectiveMemoryClock: '15000 MHz',
        color: 'Black',
        frameSync: 'G-Sync', // Intel = G-Sync
        length: '235 mm',
        tdp: '170 W',
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
