'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Storage', [
      {
        partId: 19,
        capacity: '2 TB',
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: '$0.132',
        interface: 'PCIe 5.0 X4', // NVMe if PCIe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partId: 20,
        capacity: '2 TB',
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: '$0.060',
        interface: 'PCIe 4.0 X4', // NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partId: 21,
        capacity: '1 TB',
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: '$0.234',
        interface: 'SATA 6.0 GB/s', // 2.5" SSD (not M.2; therefore, not NVMe)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partId: 22,
        capacity: '3 TB',
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: '$0.027',
        interface: 'SATA 6.0 GB/s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Storage', null, {});
  }
};
