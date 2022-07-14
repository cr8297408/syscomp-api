const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const db = require('../../../config/connection/connectBd'); 
const AuthValidation = require('./validation');
const User = require('../user/model');
const config = require('../../../config/env');
const getUser = require('../../middlewares/getUser');
const sendMail = require('../../resources/send-mail');
const {TemplateSign} = require('../../resources/getTemplate');
const HttpResponse = require('../../response');

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
        return new HttpResponse(400, validate.error);
      }

      const user = await User.findOne({
        where: {email: body.email}
      })

      if (!user) {
        return new HttpResponse(400, 'credenciales incorrectas');
      }
      const result = bcrypt.compareSync(body.password, user.password);
      if (!result) {
        return new HttpResponse(400, 'credenciales incorrectas');
      }
      const dataToken = {
        id : user.id,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        typeUser: user.typeUser,
      }

      const token = jsonwebtoken.sign({dataToken}, config.JWT_SECRET);
      return new HttpResponse(200, token);

    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async changePassword(body, bearerHeader){
    try {
      const user = await getUser(bearerHeader);
      const comparePass = bcrypt.compareSync(body.oldPassword,user.password);
      console.log(comparePass);
      if(body.email !== user.email || !comparePass){
        return new HttpResponse(400, 'credenciales incorrectas');
      }

      const changePassword = await User.update({
        password: bcrypt.hashSync(body.newPassword, 10),
      }, {
        where: {
          id: user.id
        }
      })

      return new HttpResponse(200, 'contraseña cambiada');
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async forgotPassword(email){
    try {

      let message = 'revisa tu email para cambiar la contraseña'

      const user = await User.findOne({
        where: {email}
      })

      if (!user) {
        return new HttpResponse(400, 'credenciales incorrectas');
      }

      const dataToken = {
        id : user.id,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        typeUser: user.typeUser,
      }

      const token = jsonwebtoken.sign({dataToken}, config.JWT_SECRET);
      const url = `${config.URL_FORGOT_PASS}/newPassword/${token}`

      // SEND EMAIL WITH LINK

      let contactLink = config.CONTACT_LINK;

      const emailFrom = config.MAIL_USER;
      const emailTo = user.email;
      const subject = 'recuperación contraseña'
      const textPrincipal = `Para recuperar tu contraseña ingresa al siguiente link`
      const html = TemplateSign(textPrincipal, user.username, url, contactLink)
      await sendMail('syscomp', emailFrom, emailTo, subject,html)

      return new HttpResponse(200, 'revisa tu correo');
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async newPassword(newPassword, bearerHeader){
    try {
      const user = await getUser(bearerHeader);
      
      let newpass = bcrypt.hashSync(newPassword, 10)
      const changePassword = await User.update({
        password: newpass,
      }, {
        where: {id: user.dataValues.id}
      })

      return new HttpResponse(200, 'contraseña cambiada');
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  
  async getUserLog(bearerHeader){
    try {
      const user = await getUser(bearerHeader);
      if (!user) {
        return new HttpResponse(400, 'token invalido');
      }
      return new HttpResponse(200, user);
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  }
}

module.exports = AuthService;