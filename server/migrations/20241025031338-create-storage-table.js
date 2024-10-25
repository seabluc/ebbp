'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Storage", {
      storageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
        type: Sequelize.INTEGER, // if length > 1 GB else TB
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
      pricePerGig: { // $#.## / GB
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      interface: { // validate as SSD, Sata, or NVMe
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Storage");
  }
};
