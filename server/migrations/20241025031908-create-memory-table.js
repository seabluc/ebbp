'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Memory", {
      memoryId: {
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
      memoryType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              ['DDR4', 'DDR5',],
            ],
            msg: "EBBP only supports components compatible with DDR4 or DDR5."
          },
        },
      },
      speed: { // DDR#-#### MHz ... can I validate this given there are only a set amount of memory speeds? find out what they all are?
        type: Sequelize.INTEGER, // in MHz
        allowNull: false,
      },
      casLatency: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trueLatency: { // in ns
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      /* omitted for now
      timing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      */
      capacity: { // in GB
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      modules: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pricePerGig: {
        type: Sequelize.FLOAT,
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
      voltage: { // in V
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      heatSpreader: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Memory");
  }
};
