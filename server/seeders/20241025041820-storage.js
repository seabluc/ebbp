'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Storage', [
      {
        storageId: 1,
        partId: 19,
        capacity: 2,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.132,
        interface: 'PCIe 5.0 X4', // NVMe if PCIe
        nvme: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 2,
        partId: 20,
        capacity: 2,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.060,
        interface: 'PCIe 4.0 X4', // NVMe
        nvme: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 3,
        partId: 21,
        capacity: 1,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.234,
        interface: 'SATA 6.0 GB/s', // 2.5" SSD (not M.2; therefore, not NVMe)
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 4,
        partId: 22,
        capacity: 3,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: 0.027,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 5,
        partId: 91,
        capacity: 2,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: 0.032,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 6,
        partId: 92,
        capacity: 2,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: 0.032,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 7,
        partId: 93,
        capacity: 4,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: 0.035,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 8,
        partId: 94,
        //capacity: 750,
        capacity: 1,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD
        pricePerGig: 0.105,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 9,
        partId: 95,
        capacity: 2,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD ... hybrid apparently
        pricePerGig: 0.040,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 10,
        partId: 96,
        capacity: 1,
        formFactor: '3.5"',
        type: '7200 RPM', // RPM = HDD l
        pricePerGig: 0.105,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 11,
        partId: 97,
        capacity: 1,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.080,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 12,
        partId: 98,
        capacity: 1,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.151,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 13,
        partId: 99,
        capacity: 1,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.110,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 14,
        partId: 100,
        capacity: 1,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.056,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 15,
        partId: 101,
        capacity: 2,
        formFactor: '2.5"',
        type: 'SSD',
        pricePerGig: 0.117,
        interface: 'SATA 6.0 GB/s',
        nvme: 0, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 16,
        partId: 102,
        capacity: 1,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.055,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 17,
        partId: 103,
        capacity: 1,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.074,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 18,
        partId: 104,
        capacity: 2,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.054,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 19,
        partId: 105,
        capacity: 2,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.069,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 20,
        partId: 106,
        capacity: 1,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.094,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 21,
        partId: 107,
        capacity: 1,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.050,
        interface: 'M.2 PCIe 4.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 22,
        partId: 108,
        capacity: 4,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.087,
        interface: 'M.2 PCIe 5.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storageId: 23,
        partId: 109,
        capacity: 2,
        formFactor: 'M.2-2280',
        type: 'SSD',
        pricePerGig: 0.120,
        interface: 'M.2 PCIe 5.0 X4',
        nvme: 1, // not NVMe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Storage', null, {});
  }
};
