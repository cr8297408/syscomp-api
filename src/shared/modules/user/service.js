const User = require('./model');
const db = require('../../../config/connection/connectBD');
const UserValidation = require('./validation');
const Pagination = require('../../middlewares/pagination')
const { Op } = require("sequelize");
const permissions = require('../../middlewares/permissions')
const bcrypt = require('bcrypt')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {User} model
 */
const UserService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Users = await User.findAll()
        return Users;  
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {User} model 
   */
  async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      console.log(validatePermission);
      if (validatePermission) {
        const validate = UserValidation.createUser(body);
        if (validate.error) {
          throw new Error(validate.error)
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
          return {
            status: 400,
            message: 'el email ya está en uso '
          }
        }
        if (existsUser) {
          return {
            status: 400,
            message: 'el usuario ya está en uso '
          }
        }
  
        const createdUser = await User.create({
          email: body.email,
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
          password: bcrypt.hashSync(body.password, 10),
          roles: body.roles,
          profile: body.profile,
          avatarFile: body.avatarFile,
          typeUser: body.typeUser
        });
        return createdUser;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {User} model
   */

   async findOne(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = UserValidation.getUser(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getsUser = await User.findByPk(id)
        return getsUser;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {User} model
   */
  async delete(bearerHeader,id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await UserValidation.getUser(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
        const newUser = await User.update(
          {
            isActive: false,
            verified: false
          },
          {where: {id}}
        )
  
        return newUser;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        const validate = await UserValidation.getUser(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
        const newUser = await User.update(
          {
            isActive: true,
            verified: true,
          },
          {where: {id}}
        )
  
        return newUser;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
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
  async update(bearerHeader,id, body){
    try {
      
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        const validateid = await UserValidation.getUser(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
        const validateBody = await UserValidation.createUser(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
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
          },
          {where: {id}}
        )
  
        return newUser;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }

    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader,sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const Users = await Pagination('users',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Users
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }

    } catch (error) {
        throw new Error(error.message);
    }
  },

}

module.exports = UserService;