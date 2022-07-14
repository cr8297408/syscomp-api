const db = require('../../config/connection/connectBd');
const ItemValidation = require('./validation');
const Item = require('./model');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');
const getUser = require('../../shared/middlewares/getUser');

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
        return new HttpResponse(200, Items);
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
   * @implements {Item} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_ITEM'])
      if (validatePermission) {
        const validate = ItemValidation.createItem(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader)
        const createItem = await Item.create({
          sum: body.sum,
          amount: body.amount,
          description: body.description,
          FactureId: body.FactureId,
          createdBy: user.id
        });
        return new HttpResponse(200, 'item creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
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
          return new HttpResponse(400, validate.error);
        }
        const getItem = await Item.findByPk(id)
        return new HttpResponse(200, getItem);
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
   * @implements {Item} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_ITEM'])
      if (validatePermission) {
        const validate = await ItemValidation.getItem(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getItem = await Item.findByPk(id);
        
        await getItem.destroy()

        return new HttpResponse(200, 'item eliminado');
        
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
   * @description update a Item in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_ITEM'])
      if (validatePermission) {
        
        const validateid = await ItemValidation.getItem(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }
        
        const user = await getUser(bearerHeader)
        const newItem = await Item.update(
          {
            sum: body.sum,
            amount: body.amount,
            description: body.description,
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'item actualizado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      if(isActive == undefined || typeof(isActive) !== 'boolean'){
        isActive = true
      }
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_ITEM'])
      if (validatePermission) {
        let query = `SELECT * FROM items WHERE sum LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Items = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Items);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ItemService;