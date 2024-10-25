'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motherboard', {
      motherboardId: {
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
      socket: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      formFactor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chipset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memoryMax: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      memoryType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['DDR4', 'DDR5']],
          },
        }
      },
      memorySlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pcieSixteenSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieEightSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieFourSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieOneSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pcieSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sataSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      onboardEthernet: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      onboardVideo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usbTwoHeader: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usbTwoHeaderSinglePort: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenOneHeader: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenTwoHeader: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usbThreeTwoGenTwoByTwoHeader: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wirelessNetworking: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      raidSupport: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      backConnectors: {
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
    await queryInterface.dropTable('Motherboard');
  }
};
