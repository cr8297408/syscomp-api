'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    let user = [{
      id: "userAdminjkkjj",
      username: "superadmin1",
      password: bcrypt.hashSync("Admin1", 10),
      email: "admin1@mail.com",
      firstName: "admin1",
      lastName: "user1",
      avatarFile: "avaatarlink1",
      typeUser: "SUPER_ADMIN",
      isActive: true,
      isAdmin: true
    }]
    await queryInterface.bulkInsert('users', user, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      id: 'userAdminjkkjj'
    }, {});
  }
};
