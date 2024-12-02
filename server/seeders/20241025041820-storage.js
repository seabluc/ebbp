const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/Storage.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            storageId: parseInt(row.storageId),
            partId: parseInt(row.partId),
            capacity: parseInt(row.capacity),
            formFactor: row.formFactor,
            type: row.type,
            pricePerGig: parseFloat(row.pricePerGig),
            interface: row.interface,
            nvme: parseInt(row.nvme),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('Storage', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Storage', null, {});
  }
};
