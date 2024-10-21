'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Part', 'price', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Part', 'partNum', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Reorder manufacturer to come after price
    await queryInterface.sequelize.query(`
      ALTER TABLE Part MODIFY COLUMN price VARCHAR(255) NOT NULL AFTER image;
      `);

  await queryInterface.sequelize.query(`
    ALTER TABLE Part MODIFY COLUMN partNum VARCHAR(255) NOT NULL AFTER manufacturer;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Part', 'partNum');
    await queryInterface.removeColumn('Part', 'price');
  }
};
