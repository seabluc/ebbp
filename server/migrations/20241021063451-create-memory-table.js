'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Memory", {
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
      speed: { // DDR#-#### MHz ... can I validate this given there are only a set amount of memory speeds? find out what they all are?
        type: Sequelize.STRING,
        allowNull: false,
      },
      casLatency: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trueLatency: { // ## ns
        type: Sequelize.STRING,
        allowNull: false,
      },
      timing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      modules: {
        // i dont think ill include any memory products that are < 8gb
        // ill also likely omit products where there are > 4 modules and omit
        // products that exceed 192GB, which are 4x64GB, 8x32GB, 8x48GB, 8x64GB
        type: Sequelize.STRING,
        allowNull: false,
        /*
        validate: {
          isIn: {
            args: [
              []
            ]
          }
        }
          */
      },
      pricePerGig: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      formFactor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                '288-pin DIMM (DDR4)', '260-pin SODIMM (DDR4)',
                '288-pin DIMM (DDR5)', '288-pin SODIMM (DDR5)',
              ],
            ],
          },
        },
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      voltage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      heatSpreader: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      /* generate update-memory-table
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      */
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Memory");
  }
};
