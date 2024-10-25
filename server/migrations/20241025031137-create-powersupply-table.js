'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PowerSupply", {
      psuId: {
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
      formFactor: { // omit Flex ATX, Mini ITX, and TFX.
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['ATX', 'SFX',],
            ],
          },
        },
      },
      efficiency: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['80+', '80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum', '80+ Titanium',],
            ],
          },
        },
      },
      modularity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['Fully modular', 'Semi-modular', 'Non-modular',],
            ],
          },
        },
      },
      wattage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      length: { // in mm
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: { // nullable, rather useless spec...
        type: Sequelize.STRING,
        allowNull: true,
      },
      atxFourConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      epsEightConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieTwelvePlusFourConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieTwelveConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieEightConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieSixPlusTwoConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieSixConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sataConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      molexFourConn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PowerSupply");
  }
};
