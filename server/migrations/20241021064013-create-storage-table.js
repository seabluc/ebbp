'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Storage", {
      memoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      partId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Part',
          key: 'partId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      capacity: { // in GB or TB
        type: Sequelize.STRING,
        allowNull: false,
      },
      formFactor: { // in inches or M.2 dimensions in mm..? verify with PcPP
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: { // validate: if it's hdd then format will be ####RPM. if not, then 'SSD' but verify with how PcPP handles this spec
        type: Sequelize.STRING,
        allowNull: false,
      },
      pricePerGig: { // $#.## / gb
        type: Sequelize.STRING,
        allowNull: false,
      },
      interface: { // validate as SSD, Sata, or NVMe
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [
            ['SSD', 'SATA', 'NVMe',]
          ],
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Storage");
  }
};
