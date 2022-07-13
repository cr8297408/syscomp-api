const db = require('../../config/connection/connectBd');
const ClientValidation = require('./validation');
const Client = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpError = require('../../shared/errors');

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
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpError(400, error.message);
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
        const validate = ClientValidation.createClient(body);
        if (validate.error) {
          console.log(new HttpError(400, validate.error));
          return new HttpError(400, validate.error);
        }
  
        const createClient = await Client.create({
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
        return createClient;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
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
          return new HttpError(400, validate.error);
        }
        const getClient = await Client.findByPk(id);
        return getClient;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
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
          return new HttpError(400, validate.error);
        }

        const newUser = await Client.update(
          {
            isActive: false
          },
          {where: {id}}
        )
  
        return newUser;
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
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
          return new HttpError(400, validateid.error)
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
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_CLIENT'])
      if (validatePermission) {
        const Clients = await Pagination('clients',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Clients
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = ClientService;