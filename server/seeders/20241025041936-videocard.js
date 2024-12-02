const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/VideoCard.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            videoCardId: parseInt(row.videoCardId),
            partId: parseInt(row.partId),
            chipset: row.chipset,
            memory: parseInt(row.memory),
            memoryType: row.memoryType,
            coreClock: parseInt(row.coreClock),
            boostClock: parseInt(row.boostClock) || null,
            effectiveMemoryClock: parseInt(row.effectiveMemoryClock) || null,
            color: row.color,
            frameSync: row.frameSync,
            length: parseInt(row.length),
            tdp: parseInt(row.tdp),
            caseSlotWidth: parseInt(row.caseSlotWidth),
            totalSlotWidth: parseInt(row.totalSlotWidth),
            coolingFan: parseInt(row.coolingFan),
            externalPower: row.externalPower,
            dpOutput: parseInt(row.dpOutput),
            hdmiOutput: parseInt(row.hdmiOutput),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('VideoCard', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VideoCard', null, {});
  }
};
