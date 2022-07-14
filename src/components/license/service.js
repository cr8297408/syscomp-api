const db = require('../../config/connection/connectBd');
const LicenseValidation = require('./validation');
const License = require('./model');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {License} model
 */
const LicenseService = {
  /**
   * @exports
   * @implements {License} model
   * @description get all Licenses 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_LICENSE'])
      if (validatePermission) {
        const Licenses = await License.findAll()
        return new HttpResponse(200, Licenses);
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
   * @implements {License} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_LICENSE'])
      if (validatePermission) {
        console.log('validate pass');
        const validate = LicenseValidation.createLicense(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const createLicense = await License.create(body);
        return new HttpResponse(200, 'licencia creada');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {License} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_LICENSE'])
      if (validatePermission) {
        const validate = LicenseValidation.getLicense(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getLicense = await License.findByPk(id)
        return new HttpResponse(200, getLicense);
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
   * @implements {License} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_LICENSE'])
      if (validatePermission) {
        const validate = await LicenseValidation.getLicense(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getLicense = await License.findByPk(id);
        
        await getLicense.destroy()

        return new HttpResponse(200, 'licencia eliminada');
        
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
   * @description update a License in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_LICENSE'])
      if (validatePermission) {
        
        const validateid = await LicenseValidation.getLicense(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }

        const newLicense = await License.update(
          {
            type: body.type,
            description: body.description,
            start_date: body.start_date,
            expired_date: body.expired_date,
            isActive: body.isActive,
            isLifetime: body.isLifetime,
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'licencia actualizada');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_LICENSE'])
      if (validatePermission) {
        const Licenses = await Pagination('Licenses',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return new HttpResponse(200, Licenses);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = LicenseService;