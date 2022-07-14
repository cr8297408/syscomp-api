const db = require('../../config/connection/connectBd');
const __name__Validation = require('./validation');
const __name__ = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL___name__'])
      if (validatePermission) {
        const __name__s = await __name__.findAll()
        return new HttpResponse(200, __name__s);
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
   * @implements {__name__} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE___name__'])
      if (validatePermission) {
        const validate = __name__Validation.create__name__(body);
        if (validate.error) {
          console.log(new HttpResponse(400, validate.error));
          return new HttpResponse(400, validate.error);
        }
  
        const create__name__ = await __name__.create({
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
   * @implements {__name__} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE___name__'])
      if (validatePermission) {
        const validate = __name__Validation.get__name__(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const get__name__ = await __name__.findByPk(id);
        return new HttpResponse(200, get__name__);
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
   * @implements {__name__} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE___name__'])
      if (validatePermission) {
        const validate = await __name__Validation.get__name__(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const newUser = await __name__.update(
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
   * @description update a __name__ in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE___name__'])
      if (validatePermission) {
        
        const validateid = await __name__Validation.get__name__(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
  
        const new__name__ = await __name__.update(
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
  
        return new HttpResponse(200, 'usuario modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION___name__'])
      if (validatePermission) {
        const __name__s = await Pagination('__name__s',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return new HttpResponse(200, __name__s);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = __name__Service;