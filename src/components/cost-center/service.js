const db = require('../../config/connection/connectBd');
const CostCenterValidation = require('./validation');
const CostCenter = require('./model');
const License = require('../license/model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const { UUIDV4 } = require('sequelize');
const Node = require('../node/model');
const HttpError = require('../../shared/errors');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {CostCenter} model
 */
const CostCenterService = {
  /**
   * @exports
   * @implements {CostCenter} model
   * @description get all CostCenters 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_COST_CENTER'])
      if (validatePermission) {
        const CostCenters = await CostCenter.findAll()
        return CostCenters;
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
   * @implements {CostCenter} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_COST_CENTER'])
      if (validatePermission) {
        const validate = CostCenterValidation.createCostCenter(body);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        const LicenseCostCenter = await License.findByPk(body.LicenseId);

        if (!LicenseCostCenter) {
          return new HttpError(400, "licencia invalida...");
        }

        const CostCentersLicense = await CostCenter.findOne({
          where: {
            LicenseId: LicenseCostCenter.id
          }
        })


        if (LicenseCostCenter.type == 'SERVER' && CostCentersLicense) {
          return new HttpError(400, 'tu licencia es tipo servidor por ende solo puede tener un centro de costo.');
        }
  
        const createCostCenter = await CostCenter.create({
          LicenseId: body.LicenseId,
          serial_license: LicenseCostCenter.serial,
          name: body.name,
          initDate: body.initDate ,
          finishDate: body.finishDate ,
          price: body.price ,
          debit: body.debit ,
          direction: body.direction ,
          isLifetime: body.isLifetime ,
          isActive: body.isActive ,
        });

        return createCostCenter;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {CostCenter} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_COST_CENTER'])
      if (validatePermission) {
        const validate = CostCenterValidation.getCostCenter(id);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
        const getCostCenter = await CostCenter.findByPk(id)
        return getCostCenter;
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
   * @implements {CostCenter} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_COST_CENTER'])
      if (validatePermission) {
        const validate = await CostCenterValidation.getCostCenter(id)

        if (validate.error) {
          return new HttpError(validate.error)
        }

        const getCostCenter = await CostCenter.findByPk(id);
        
        await getCostCenter.destroy()

        return getCostCenter;
        
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
   * @description update a User in the db
   */

     async activateCostCenter(bearerHeader,id, body){
      try {
        const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
        if (validatePermission) {
          const validate = await CostCenterValidation.getCostCenter(id)
    
          if (validate.error) {
            return new HttpError(400, validate.error);
          }
          const newCostCenter = await CostCenter.update(
            {
              isActive: true,
            },
            {where: {id}}
          )
    
          return newCostCenter;
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
   * @description update a CostCenter in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
      if (validatePermission) {
        
        const validateid = await CostCenterValidation.getCostCenter(id);
        
        if (validateid.error) {
          return new HttpError(400, validateid.message);
        }
  
        const newCostCenter = await CostCenter.update(
          {
            name: body.name,
            initDate: body.initDate ,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit ,
            direction: body.direction ,
            isLifetime: body.isLifetime ,
            isActive: body.isActive ,
          },
          {where: {id}}
        )
  
        return newCostCenter;
        
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
        const CostCenters = await Pagination('CostCenters',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return CostCenters
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = CostCenterService;