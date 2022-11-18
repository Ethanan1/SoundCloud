'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: "Drake",
        firstName: "Aubrey",
        lastName: "Graham",
        password: bcrypt.hashSync('passwordDrake'),
        email: "drake@gmail.com",
        imageUrl: "https://www.biography.com/.image/t_share/MTQ3NTI2OTA4NzY5MjE2MTI4/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg",
      },
      {
        username: "ChrisBrown",
        firstName: "Chris",
        lastName: "Brown",
        password: bcrypt.hashSync('passwordChris'),
        email: "chris@gmail.com",
        imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTmdhsFsTsTh7oKCRy7HaxMQJTEOcTgDQUA9F2065wBcXgBRlj_",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', NULL, {});
  }
};
