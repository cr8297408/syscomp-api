const db = require('../../config/connection/connectBd');
const FactureValidation = require('./validation');
const Facture = require('./model');
const Pagination = require('../../shared/middlewares/pagination');
const permissions = require('../../shared/middlewares/permissions');
const HttpError = require('../../shared/errors');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Facture} model
 */
const FactureService = {
  /**
   * @exports
   * @implements {Facture} model
   * @description get all Factures 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_FACTURE'])
      if (validatePermission) {
        const Factures = await Facture.findAll()
        return Factures;
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
   * @implements {Facture} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_COST_CENTER'])
      if (validatePermission) {
        const validate = FactureValidation.createFacture(body);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        let data = {
          ClientId: body.ClientId,
          LicenseId: body.LicenseId,
          UserId: body.UserId,
          observation: body.observation,
          amount: body.amount,
          limitDate: body.limitDate,
          rememberDate: body.rememberDate,
          paidOut: body.paidOut,
          estate: body.estate,
        }
  
        const createFacture = await Facture.create(data);
        return createFacture;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Facture} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_COST_CENTER'])
      if (validatePermission) {
        const validate = FactureValidation.getFacture(id);
        if (validate.error) {
          new HttpError(400, validate.error)
        }
        const getFacture = await Facture.findByPk(id)
        return getFacture;
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
   * @implements {Facture} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_COST_CENTER'])
      if (validatePermission) {
        const validate = await FactureValidation.getFacture(id)

        if (validate.error) {
          new HttpError(400, validate.error)
        }

        const getFacture = await Facture.findByPk(id);
        
        await getFacture.destroy()

        return getFacture;
        
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
   * @description update a Facture in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
      if (validatePermission) {
        
        const validateid = await FactureValidation.getFacture(id);
        
        if (validateid.error) {
          return new HttpError(400, validateid.error);
        }
  
        const newFacture = await Facture.update(
          {
            UserId: body.UserId,
            observation: body.observation,
            amount: body.amount,
            limitDate: body.limitDate,
            rememberDate: body.rememberDate,
            paidOut: body.paidOut,
            estate: body.estate,
          },
          {where: {id}}
        )
  
        return newFacture;
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_COST_CENTER'])
      if (validatePermission) {
        const Factures = await Pagination('Factures',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Factures
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = FactureService;