const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/MotherboardMemorySpeed.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            memorySpeedId: parseInt(row.memorySpeedId),
            motherboardId: parseInt(row.motherboardId),
            memorySpeed: row.memorySpeed,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('MotherboardMemorySpeed', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MotherboardMemorySpeed', null, {});
  }
};
