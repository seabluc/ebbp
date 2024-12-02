const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const filePath = path.join(__dirname, '../data/Cpu.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            cpuId: parseInt(row.cpuId),
            partId: parseInt(row.partId),
            series: row.series,
            microarchitecture: row.microarchitecture,
            coreFamily: row.coreFamily,
            socket: row.socket,
            coreCount: parseInt(row.coreCount),
            threadCount: parseInt(row.threadCount),
            performanceCoreClock: parseFloat(row.performanceCoreClock),
            performanceCoreBoostClock: parseFloat(row.performanceCoreBoostClock),
            efficiencyCoreClock: parseFloat(row.efficiencyCoreClock) || null,
            efficiencyCoreBoostClock: parseFloat(row.efficiencyCoreBoostClock) || null,
            lTwoCache: parseInt(row.lTwoCache),
            lThreeCache: parseInt(row.lThreeCache) || null,
            tdp: parseInt(row.tdp),
            maxTurboPower: parseInt(row.maxTurboPower) || null,
            integrated: row.integrated,
            memoryMax: parseInt(row.memoryMax),
            lithography: parseInt(row.lithography),
            includedCooler: parseInt(row.includedCooler),
            multithreading: parseInt(row.multithreading),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return queryInterface.bulkInsert('Cpu', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cpu', null, {});
  }
};