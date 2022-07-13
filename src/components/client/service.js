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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_CLIENT'])
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
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_CLIENT'])
      if (validatePermission) {
        const validate = ClientValidation.createClient({
          businessName: body.businessName,
          nit: body.nit,
          email: body.email,
          repLegalContact: body.repLegalContact,
          phoneNumber: body.phoneNumber,
          municipality: body.municipality,
          department: body.department,
          country: body.country,
          contactDate: body.contactDate,
          direction : body.direction,
        });
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
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_CLIENT'])
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
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_CLIENT'])
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
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_CLIENT'])
      if (validatePermission) {
        
        const validateid = await ClientValidation.getClient(id);
        
        if (validateid.error) {
          throw new Error(validateid.error)
        }
  
        const newClient = await Client.update(
          {
            businessName: body.businessName,
            repLegalContact: body.repLegalContact,
            phoneNumber: body.phoneNumber,
            municipality: body.municipality,
            department: body.department,
            country: body.country,
            contactDate: body.contactDate,
            direction : body.direction,
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
      throw new Error(error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_CLIENT'])
      if (validatePermission) {
        const Clients = await Pagination('clients',sequelize,sizeAsNumber, pageAsNumber, wherecond)
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