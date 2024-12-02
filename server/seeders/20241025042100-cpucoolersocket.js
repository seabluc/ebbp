const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/CpuCoolerSocket.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            coolerSocketId: parseInt(row.coolerSocketId),
            cpuCoolerId: parseInt(row.cpuCoolerId),
            socket: row.socket,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('CpuCoolerSocket', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CpuCoolerSocket', null, {});
  }
};
