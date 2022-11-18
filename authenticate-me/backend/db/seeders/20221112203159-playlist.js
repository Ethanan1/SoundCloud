'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: "All Songs",
        imageUrl: "https://media.pitchfork.com/photos/636509072145df8a03cc87b0/1:1/w_320,c_limit/Drake.jpg",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Playlists', NULL, {});
  }
};
