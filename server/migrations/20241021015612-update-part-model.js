'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Renaming PK from id to partId
    await queryInterface.renameColumn('Part', 'id', 'partId');

    // Add manufacturer attribute
    await queryInterface.addColumn('Part', 'manufacturer', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    /*
    // Add price attribute
    await queryInterface.addColumn('Part', 'price', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Add partNum attribute
    await queryInterface.addColumn('Part', 'partNum', {
      type: Sequelize.STRING,
      allowNull: false,

      make it so createdAt and updatedAt are at the end. Might just have to completely delete the Part table
      and remake the entire Part migration file but this time with all the attributes Part NEEDS
    });
    */
  },

  // undo changes from 015612update-part-model
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Part', 'partId', 'id');
    await queryInterface.removeColumn('Part', 'manufacturer');
    //await queryInterface.renameColumn('Part', 'price');
    //await queryInterface.removeColumn('Part', 'partNum');
  }
};
