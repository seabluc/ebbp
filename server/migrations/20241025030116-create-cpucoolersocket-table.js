'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CpuCoolerSocket', {
      coolerSocketId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      cpuCoolerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CpuCooler',
          key: 'cpuCoolerId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      socket: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['AM4', 'AM5', 'LGA1700', 'LGA1851',],
            ],
            msg: "All Motherboards and Cpus on EBBP are limited to AM4, AM5, LGA1700, and LGA1851 sockets."
          },
        },
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
    await queryInterface.dropTable('CpuCoolerSocket');
  }
};
