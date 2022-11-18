'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', [
      {
        songId: 1,
        playlistId: 1,
        order: 1,
      },
      {
        songId: 2,
        playlistId: 1,
        order: 2,
      },
      {
        songId: 3,
        playlistId: 1,
        order: 3,
      },
      {
        songId: 4,
        playlistId: 1,
        order: 4,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('PlaylistSongs', NULL, {});
  }
};
