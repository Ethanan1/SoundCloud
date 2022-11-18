'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        albumId: 1,
        userId: 1,
        title: "Rich Flex",
        description: "Track One",
        url: "?",
        imageUrl: "https://media.pitchfork.com/photos/636509072145df8a03cc87b0/1:1/w_320,c_limit/Drake.jpg",
      },
      {
        albumId: 1,
        userId: 1,
        title: "Major Distribution",
        description: "Track Two",
        url: "?",
        imageUrl: "https://media.pitchfork.com/photos/636509072145df8a03cc87b0/1:1/w_320,c_limit/Drake.jpg",
      },
      {
        albumId: 2,
        userId: 2,
        title: "Indigo",
        description: "Track One",
        url: "?",
        imageUrl: "https://en.wikipedia.org/wiki/Indigo_(Chris_Brown_album)#/media/File:Chris_Brown_-_Indigo.png",
      },
      {
        albumId: 2,
        userId: 2,
        title: "Back To Love",
        description: "Track Two",
        url: "?",
        imageUrl: "https://en.wikipedia.org/wiki/Indigo_(Chris_Brown_album)#/media/File:Chris_Brown_-_Indigo.png",
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', NULL, {}); //makes easier for initial testing
  }
};
