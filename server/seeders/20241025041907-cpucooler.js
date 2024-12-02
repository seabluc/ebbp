const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/CpuCooler.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            cpuCoolerId: parseInt(row.cpuCoolerId),
            partId: parseInt(row.partId),
            fanRPM: parseInt(row.fanRPM),
            noiseLevel: parseInt(row.noiseLevel),
            color: row.color,
            height: parseInt(row.height) || null,
            radiatorSize: parseInt(row.radiatorSize) || null,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('CpuCooler', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CpuCooler', null, {});
  }
};
