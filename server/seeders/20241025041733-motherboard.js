const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/Motherboard.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            motherboardId: parseInt(row.motherboardId),
            partId: parseInt(row.partId),
            socket: row.socket,
            formFactor: row.formFactor,
            chipset: row.chipset,
            memoryMax: parseInt(row.memoryMax),
            memoryType: row.memoryType,
            memorySlot: parseInt(row.memorySlot),
            color: row.color,
            pcieSixteenSlot: parseInt(row.pcieSixteenSlot),
            pcieEightSlot: parseInt(row.pcieEightSlot),
            pcieFourSlot: parseInt(row.pcieFourSlot),
            pcieOneSlot: parseInt(row.pcieOneSlot),
            pcieSlot: parseInt(row.pcieSlot),
            sataSlot: parseInt(row.sataSlot),
            mTwoSlot: parseInt(row.mTwoSlot),
            onboardEthernet: row.onboardEthernet,
            onboardVideo: row.onboardVideo,
            usbTwoHeader: parseInt(row.usbTwoHeader),
            usbTwoHeaderSinglePort: parseInt(row.usbTwoHeaderSinglePort),
            usbThreeTwoGenOneHeader: parseInt(row.usbThreeTwoGenOneHeader),
            usbThreeTwoGenTwoHeader: parseInt(row.usbThreeTwoGenTwoHeader),
            usbThreeTwoGenTwoByTwoHeader: parseInt(row.usbThreeTwoGenTwoByTwoHeader),
            wirelessNetworking: row.wirelessNetworking,
            raidSupport: parseInt(row.raidSupport),
            backConnectors: parseInt(row.backConnectors),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('Motherboard', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Motherboard', null, {});
  }
};
