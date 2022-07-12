const db = require('../../config/connection/connectBd');
const FactureValidation = require('./validation');
const Facture = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

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
   * @implements {Facture} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_COST_CENTER'])
      if (validatePermission) {
        const validate = FactureValidation.createFacture(body);
        if (validate.error) {
          throw new Error(validate.error)
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
   * @implements {Facture} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_COST_CENTER'])
      if (validatePermission) {
        const validate = FactureValidation.getFacture(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getFacture = await Facture.findByPk(id)
        return getFacture;
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
   * @implements {Facture} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_COST_CENTER'])
      if (validatePermission) {
        const validate = await FactureValidation.getFacture(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getFacture = await Facture.findByPk(id);
        
        await getFacture.destroy()

        return getFacture;
        
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
   * @description update a Facture in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
      if (validatePermission) {
        
        const validateid = await FactureValidation.getFacture(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await FactureValidation.createFacture(body)
        if (validateBody.error) {
          throw new Error(validate.error)
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
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_COST_CENTER'])
      if (validatePermission) {
        const Factures = await Pagination('Factures',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Factures
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

module.exports = FactureService;