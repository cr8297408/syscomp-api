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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
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
      const validatePermission = await permissions(bearerHeader, 'CREATE')
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
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
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
      const validatePermission = await permissions(bearerHeader, 'DELETE')
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ItemValidation.getItem(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ItemValidation.createItem(body)
        if (validateBody.error) {
          throw new Error(validate.error)
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
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
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