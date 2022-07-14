const bcrypt = require('bcrypt');
const User = require('./model');
const db = require('../../../config/connection/connectBd');
const UserValidation = require('./validation');
const FileService = require('../files/aws-cloud-service');
const Pagination = require('../../middlewares/pagination');
const {TemplateSign} = require('../../resources/getTemplate');
const config = require('../../../config/env');
const permissions = require('../../middlewares/permissions');
const sendMail = require('../../resources/send-mail');
const getUser = require('../../middlewares/getUser');
const HttpResponse = require('../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {User} model
 */
const UserService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_USER'])
      if (validatePermission) {
        const Users = await User.findAll()
        return new HttpResponse(200, Users);  
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {User} model 
   */
   async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['ALTER_USER', 'CREATE_USER'])
      if (validatePermission) {
        const validate = UserValidation.createUser(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const existsMail = await User.findOne({
          where: {
            email:body.email,
          }
        })
        const existsUser = await User.findOne({
          where: {
            username:body.username,
          }
        })
  
        if (existsMail) {
          return new HttpResponse(400, 'email en uso');
        }
        if (existsUser) {
          return new HttpResponse(400, 'usuario en uso');
        }
        const user = await getUser(bearerHeader);
  
        const createdUser = await User.create({
          email: body.email,
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
          password: bcrypt.hashSync(body.password, 10),
          roles: body.roles,
          profile: body.profile,
          avatarFile: body.avatarFile,
          typeUser: body.typeUser,
          createdBy: user.id,
          isActive: body.isActive
        });

        let contactLink = config.CONTACT_LINK;
        let verificateUser = 'https://google.com'
        const emailFrom = config.MAIL_USER;
        const emailTo = body.email;
        const subject = 'Registro en Pos API'
        const textPrincipal = `te has registrado correctamete a conexion Pos, porfavor verifica tu cuenta en el siguiente link...`
        const html = TemplateSign(textPrincipal, body.username, verificateUser, contactLink)
        await sendMail('syscomp', emailFrom, emailTo, subject,html)
        return new HttpResponse(200, 'usuario creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;

    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {User} model
   */

   async findOne(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_USER'])
      if (validatePermission) {
        const validate = UserValidation.getUser(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getsUser = await User.findByPk(id)
        return new HttpResponse(200, getUser);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {User} model
   */
  async delete(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, ['ALTER_USER', 'DELETE_USER'])
      if (validatePermission) {
        const validate = await UserValidation.getUser(id)
  
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const newUser = await User.update(
          {
            isActive: false,
            verified: false
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario desactivado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a User in the db
   */

  async activateUser(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['ALTER_USER', 'ACTIVATE_USER']);
      if (validatePermission) {
        const validate = await UserValidation.getUser(id)
  
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const newUser = await User.update(
          {
            isActive: true,
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario activado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a User in the db
   */
   async update(bearerHeader,id, body){
    try {
      
      const validatePermission = await permissions(bearerHeader, ['ALTER_USER', 'UPDATE_USER'])
      if (validatePermission) {
        const validateid = await UserValidation.getUser(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }

        const user = await getUser(bearerHeader);
        const newUser = await User.update(
          {
            username: body.username,
            email:body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            roles: body.roles,
            profile: body.profile,
            isActive: body.isActive,
            isAdmin: body.isAdmin,
            avatarFile: body.avatarFile,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario actualizado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;

    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader,sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      if(isActive == undefined || typeof(isActive) !== 'boolean'){
        isActive = true
      }
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_USER'])
      if (validatePermission) {
        let query = `SELECT * FROM users WHERE username LIKE '%${wherecond}%' AND isActive = ${isActive} OR firstName LIKE '%${wherecond}%' AND isActive = ${isActive} OR lastName LIKE '%${wherecond}%' AND isActive = ${isActive} OR email LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Users = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Users);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;

    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async putAvatar(bearerHeader, originalname, path){
    try {
      const user = await getUser(bearerHeader);
      if (!user) {
        return new HttpResponse(400, 'token invalido');
      }
      const avatar = await FileService.uploadFile(path, originalname); 
      const userModif = await User.update({
        avatarFile: avatar
      }, {
        where: {id:user.id}
      })

      return userModif
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  }
}

module.exports = UserService;