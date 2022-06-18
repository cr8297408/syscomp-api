const db = require('../../config/connection/connectBd');
const ClientValidation = require('./validation');
const Client = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Client} model
 */
const ClientService = {
  /**
   * @exports
   * @implements {Client} model
   * @description get all Clients 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Clients = await Client.findAll()
        return Clients;
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
   * @implements {Client} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ClientValidation.createClient(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createClient = await Client.create(body);
        return createClient;
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
   * @implements {Client} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ClientValidation.getClient(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getClient = await Client.findByPk(id)
        return getClient;
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
   * @implements {Client} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ClientValidation.getClient(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const newUser = await Client.update(
          {
            isActive: false
          },
          {where: {id}}
        )
  
        return newUser;

        return getClient;
        
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
   * @description update a Client in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ClientValidation.getClient(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ClientValidation.createClient(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newClient = await Client.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newClient;
        
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
        const Clients = await Pagination('Clients',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Clients
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

module.exports = ClientService;