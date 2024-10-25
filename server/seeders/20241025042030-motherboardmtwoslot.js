'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MotherboardMTwoSlot', [
      {
        motherboardId: 1,
        mTwoSlot: 'M-key (2242/2260/2280/22110)',
      },
      {
        motherboardId: 1,
        mTwoSlot: 'M-key (2242/2260/2280)',
      },
      {
        motherboardId: 1,
        mTwoSlot: 'M-key (2242/2260/2280/22110)'
      },
      {
        motherboardId: 1,
        mTwoSlot: "M-key (2242/2260/2280)"
      },
      {
        motherboardId: 1,
        mTwoSlot: 'M-key (2230/2242/2260/2280/22110)',
      },
      {
        motherboardId: 1,
        mTwoSlot: 'E-key (2230/2242/2260/2280/22110)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'M-Key (2280)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 2,
        mTwoSlot: 'E-key (2280)',
      },
      {
        motherboardId: 3,
        mTwoSlot: 'M-key (2242/2260/2280/22110)',
      },
      {
        motherboardId: 3,
        mTwoSlot: 'M-key (2242/2260/2280)',
      },
      {
        motherboardId: 3,
        mTwoSlot: 'E-key (2230)',
      },
      {
        motherboardId: 4,
        mTwoSlot: 'M-key (2242/2260/2280/22110)',
      },
      {
        motherboardId: 4,
        mTwoSlot: 'M-key (2242/2260/2280)',
      },
      {
        motherboardId: 4,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 4,
        mTwoSlot: 'M-key (2280)',
      },
      {
        motherboardId: 4,
        mTwoSlot: 'M-key (2242/2260/2280)',
      }, 
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MotherboardMTwoSlot', null, {});
  }
};
