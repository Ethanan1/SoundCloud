'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "Her Loss",
        description: "New album",
        imageUrl: "https://media.pitchfork.com/photos/636509072145df8a03cc87b0/1:1/w_320,c_limit/Drake.jpg",
      },
      {
        userId: 1,
        title: "Indigo",
        description: "2019 album",
        imageUrl: "https://en.wikipedia.org/wiki/Indigo_(Chris_Brown_album)#/media/File:Chris_Brown_-_Indigo.png",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Albums', NULL, {});
  }
};
