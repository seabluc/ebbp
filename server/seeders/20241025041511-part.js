const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/Part.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            partId: parseInt(row.partId),
            name: row.name,
            type: row.type,
            image: row.image,
            price: parseFloat(row.price),
            manufacturer: row.manufacturer,
            partNum: row.partNum,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('Part', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Part', null, {});
  }
};
