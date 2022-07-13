const db = require('../../config/connection/connectBd');
const ItemValidation = require('./validation');
const Item = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Item} model
 */
const ItemService = {
  /**
   * @exports
   * @implements {Item} model
   * @description get all Items 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_ITEM'])
      if (validatePermission) {
        const Items = await Item.findAll()
        return Items;
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
   * @implements {Item} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_ITEM'])
      if (validatePermission) {
        const validate = ItemValidation.createItem(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createItem = await Item.create(body);
        return createItem;
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
   * @implements {Item} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_ITEM'])
      if (validatePermission) {
        const validate = ItemValidation.getItem(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getItem = await Item.findByPk(id)
        return getItem;
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
   * @implements {Item} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_ITEM'])
      if (validatePermission) {
        const validate = await ItemValidation.getItem(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getItem = await Item.findByPk(id);
        
        await getItem.destroy()

        return getItem;
        
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
   * @description update a Item in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_ITEM'])
      if (validatePermission) {
        
        const validateid = await ItemValidation.getItem(id);
        
        if (validateid.error) {
          throw new Error(validateid.error)
        }
  
        const newItem = await Item.update(
          {
            sum: body.sum,
            amount: body.amount,
            description: body.description,
            FactureId: body.FactureId
          },
          {where: {id}}
        )
  
        return newItem;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_ITEM'])
      if (validatePermission) {
        const Items = await Pagination('Items',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Items
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

module.exports = ItemService;