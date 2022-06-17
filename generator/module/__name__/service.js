const db = require('../../config/connection/connectBd');
const __name__Validation = require('./validation');
const __name__ = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {__name__} model
 */
const __name__Service = {
  /**
   * @exports
   * @implements {__name__} model
   * @description get all __name__s 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const __name__s = await __name__.findAll()
        return __name__s;
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
   * @implements {__name__} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = __name__Validation.create__name__(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const create__name__ = await __name__.create(body);
        return create__name__;
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
   * @implements {__name__} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = __name__Validation.get__name__(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const get__name__ = await __name__.findByPk(id)
        return get__name__;
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
   * @implements {__name__} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await __name__Validation.get__name__(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const get__name__ = await __name__.findByPk(id);
        
        await get__name__.destroy()

        return get__name__;
        
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
   * @description update a __name__ in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await __name__Validation.get__name__(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await __name__Validation.create__name__(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const new__name__ = await __name__.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return new__name__;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const __name__s = await Pagination('__name__s',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return __name__s
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

module.exports = __name__Service;