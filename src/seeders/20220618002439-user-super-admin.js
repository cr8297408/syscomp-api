'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    let user = [{
      id: 'admin1',
      username: "leonardo admin",
      password: bcrypt.hashSync("Admin@123", 10),
      email: "leonardo27188@gmail.com",
      firstName: "leonardo",
      lastName: "rios",
      avatarFile: "",
      typeUser: "SUPER_ADMIN",
      isActive: true,
      isAdmin: true
    },
    {
      id: 'admin2',
      username: "diego admin",
      password: bcrypt.hashSync("Admin@123", 10),
      email: "diego.nando.leyton@gmail.com",
      firstName: "diego",
      lastName: "leyton",
      avatarFile: "",
      typeUser: "SUPER_ADMIN",
      isActive: true,
      isAdmin: true
    },
    {
      id: 'admin3',
      username: "cesar admin",
      password: bcrypt.hashSync("Admin@123", 10),
      email: "cr8297408@gmail.com",
      firstName: "cesar",
      lastName: "ruiz",
      avatarFile: "",
      typeUser: "SUPER_ADMIN",
      isActive: true,
      isAdmin: true
    }]
    await queryInterface.bulkInsert('users', user, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      id: 'admin1',
      id: 'admin2',
      id: 'admin3'
    }, {});
  }
};
