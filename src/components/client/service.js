const db = require('../../config/connection/connectBd');
const ClientValidation = require('./validation');
const Client = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');
const getUser = require('../../shared/middlewares/getUser');

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
        return new HttpResponse(200, Clients);
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
   * @implements {Client} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_CLIENT'])
      if (validatePermission) {
        const validate = ClientValidation.createClient(body);
        if (validate.error) {
          console.log(new HttpResponse(400, validate.error));
          return new HttpResponse(400, validate.error);
        }
  
        const user = await getUser(bearerHeader)
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
          createdBy: user.id
        });
        return new HttpResponse(201, 'usuario creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.errors[0].message);
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
          return new HttpResponse(400, validate.error);
        }
        const getClient = await Client.findByPk(id);
        return new HttpResponse(200, getClient);
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
   * @implements {Client} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_CLIENT'])
      if (validatePermission) {
        const validate = await ClientValidation.getClient(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const newUser = await Client.update(
          {
            isActive: false
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario eliminado');
        
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
   * @description update a Client in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_CLIENT'])
      if (validatePermission) {
        
        const validateid = await ClientValidation.getClient(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        const user = await getUser(bearerHeader)
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
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario modificado');
        
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
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_CLIENT'])
      if (validatePermission) {
        let query = `SELECT * FROM clients WHERE businessName LIKE '%${wherecond}%' AND isActive = ${isActive} OR nit LIKE '%${wherecond}%' AND isActive = ${isActive} OR municipality LIKE '%${wherecond}%' AND isActive = ${isActive} OR department LIKE '%${wherecond}%' AND isActive = ${isActive} OR country LIKE '%${wherecond}%' AND isActive = ${isActive} OR email LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Clients = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Clients);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ClientService;