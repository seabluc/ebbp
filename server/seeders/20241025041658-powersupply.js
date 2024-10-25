'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PowerSupply', [
      {
        psuId: 1,
        partId: 25,
        formFactor: 'ATX',
        efficiency: '80+ Bronze',
        modularity: 'Semi-modular',
        wattage: 450,
        length: 140,
        atxFourConn: 0,
        epsEightConn: 1,
        pcieTwelvePlusFourConn: 0,
        pcieTwelveConn: 0,
        pcieEightConn: 0,
        pcieSixPlusTwoConn: 2,
        pcieSixConn: 0,
        sataConn: 4,
        molexFourConn: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        psuId: 2,
        partId: 26,
        formFactor: 'ATX',
        efficiency: '80+ Platinum',
        modularity: 'Fully-modular',
        wattage: 1200,
        length: 200,
        atxFourConn: 0,
        epsEightConn: 2,
        pcieTwelvePlusFourConn: 0,
        pcieTwelveConn: 0,
        pcieEightConn: 0,
        pcieSixPlusTwoConn: 8,
        pcieSixConn: 0,
        sataConn: 16,
        molexFourConn: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        psuId: 3,
        partId: 27,
        formFactor: 'ATX',
        efficiency: '80+ Gold',
        modularity: 'Fully-modular',
        wattage: 850,
        length: 140,
        color: 'Black',
        atxFourConn: 0,
        epsEightConn: 2,
        pcieTwelvePlusFourConn: 1,
        pcieTwelveConn: 0,
        pcieEightConn: 0,
        pcieSixPlusTwoConn: 3,
        pcieSixConn: 0,
        sataConn: 7,
        molexFourConn: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PowerSupply', null, {});
  }
};
