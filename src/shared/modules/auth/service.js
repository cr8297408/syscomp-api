const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const db = require('../../../config/connection/connectBD');
const AuthValidation = require('./validation');
const User = require('../user/model');
const config = require('../../../config/env')
const sendMail = require('../../resources/send-mail');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Auth} model
 */
const AuthService = {
  
  async signIn(body){
    try {
      const validate = AuthValidation.getAuth(body);
      if (validate.error) {
        throw new Error(validate.error)
      }

      const user = await User.findOne({
        where: {email: body.email}
      })

      if (!user) {
        throw new Error('credenciales incorrectas')
      }
      const result = bcrypt.compareSync(body.password, user.password);
      if (!result) {
        throw new Error('credenciales incorrectas')
      }
      const dataToken = {
        id : user.id,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        typeUser: user.typeUser,
      }

      const token = jsonwebtoken.sign({dataToken}, config.JWT_SECRET);
      return token;

    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = AuthService;