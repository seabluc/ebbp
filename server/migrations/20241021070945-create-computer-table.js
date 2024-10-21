'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Computer", {
      computerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cpuId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Cpu',
          key: 'cpuId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cpuCoolerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'CpuCooler',
          key: 'cpuCoolerId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      motherboardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Motherboard',
          key: 'motherboardId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      memoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false, // computer can have many memory modules
        references: {
          model: 'Memory',
          key: 'memoryId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      storageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false, // computer can have many storage devices
        references: {
          model: 'Storage',
          key: 'storageId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      videoCardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'VideoCard',
          key: 'videoCardId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      psuId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'PowerSupply',
          key: 'psuId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isCompatible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isEfficient: {
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
    await queryInterface.dropTable("Computer");
  }
};
