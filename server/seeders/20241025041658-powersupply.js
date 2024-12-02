const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/PowerSupply.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            psuId: parseInt(row.psuId),
            partId: parseInt(row.partId),
            formFactor: row.formFactor,
            efficiency: row.efficiency,
            modularity: row.modularity,
            wattage: parseInt(row.wattage),
            length: parseInt(row.length),
            color: row.color || null,
            atxFourConn: parseInt(row.atxFourConn),
            epsEightConn: parseInt(row.epsEightConn),
            pcieTwelvePlusFourConn: parseInt(row.pcieTwelvePlusFourConn),
            pcieTwelveConn: parseInt(row.pcieTwelveConn),
            pcieEightConn: parseInt(row.pcieEightConn),
            pcieSixPlusTwoConn: parseInt(row.pcieSixPlusTwoConn),
            pcieSixConn: parseInt(row.pcieSixConn),
            sataConn: parseInt(row.sataConn),
            molexFourConn: parseInt(row.molexFourConn),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('PowerSupply', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PowerSupply', null, {});
  }
};
