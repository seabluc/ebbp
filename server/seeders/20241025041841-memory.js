const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/Memory.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            memoryId: parseInt(row.memoryId),
            partId: parseInt(row.partId),
            memoryType: row.memoryType,
            speed: parseInt(row.speed),
            casLatency: parseInt(row.casLatency),
            trueLatency: parseFloat(row.trueLatency),
            capacity: parseInt(row.capacity),
            modules: parseInt(row.modules),
            pricePerGig: parseFloat(row.pricePerGig),
            formFactor: row.formFactor,
            color: row.color,
            voltage: parseFloat(row.voltage),
            heatSpreader: parseInt(row.heatSpreader),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('Memory', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Memory', null, {});
  }
};
