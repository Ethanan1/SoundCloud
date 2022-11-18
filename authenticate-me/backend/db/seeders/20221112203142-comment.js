'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        songId: 1,
        userId: 2,
        body: "Hello! I am Drake.",
      },
      {
        songId: 3,
        userId: 1,
        body: "Hello! I am Chris B.",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Comments', NULL, {});
  }
};
