'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = []
    for (let i = 0; i < 200; i++) {
      const user = {
        id: `userjkkjj${i}`,
        username: `user${i}`,
        password: bcrypt.hashSync(`User${i}`, 10),
        email: `user${i}@mail.com`,
        firstName: `user${i}`,
        lastName: "prueba",
        avatarFile: `avaatarlink${i}`,
        typeUser: "USER_READ"
      };

      users.push(user)      
      
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      lastName: 'prueba'
    }, {});
  }
};