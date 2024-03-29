const db = require('../../config/connection/connectBd');
const CostCenterValidation = require('./validation');
const CostCenter = require('./model');
const License = require('../license/model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const { UUIDV4 } = require('sequelize');
const Node = require('../node/model');
const HttpResponse = require('../../shared/response');
const getUser = require('../../shared/middlewares/getUser');

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
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return new HttpResponse(200, err);
    } catch(error) {
      return new HttpResponse(400, error.message);
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
          return new HttpResponse(400, validate.error);
        }

        const LicenseCostCenter = await License.findByPk(body.LicenseId);

        if (!LicenseCostCenter) {
          return new HttpResponse(400, "licencia invalida...");
        }

        const CostCentersLicense = await CostCenter.findOne({
          where: {
            LicenseId: LicenseCostCenter.id
          }
        })


        if (LicenseCostCenter.type == 'SERVER' && CostCentersLicense) {
          return new HttpResponse(400, 'tu licencia es tipo servidor por ende solo puede tener un centro de costo.');
        }
        
        const user = await getUser(bearerHeader);
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
          createdBy: user.id
        });

        return new HttpResponse(201, 'cost center creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
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
          return new HttpResponse(400, validate.error);
        }
        const getCostCenter = await CostCenter.findByPk(id)
        return new HttpResponse(200, getCostCenter);
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
   * @implements {CostCenter} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_COST_CENTER'])
      if (validatePermission) {
        const validate = await CostCenterValidation.getCostCenter(id)

        if (validate.error) {
          return new HttpResponse(validate.error)
        }

        const getCostCenter = await CostCenter.findByPk(id);
        
        await getCostCenter.destroy()

        return new HttpResponse(200, 'centro de costo eliminado');
        
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
   * @description update a User in the db
   */

     async activateCostCenter(bearerHeader,id, body){
      try {
        const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
        if (validatePermission) {
          const validate = await CostCenterValidation.getCostCenter(id)
    
          if (validate.error) {
            return new HttpResponse(400, validate.error);
          }
          const newCostCenter = await CostCenter.update(
            {
              isActive: true,
            },
            {where: {id}}
          )
    
          return new HttpResponse(200, 'centro de costo activado');
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
   * @description update a CostCenter in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_COST_CENTER'])
      if (validatePermission) {
        
        const validateid = await CostCenterValidation.getCostCenter(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.message);
        }
        
        const user = await getUser(bearerHeader)
        const newCostCenter = await CostCenter.update(
          {
            name: body.name,
            initDate: body.initDate ,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit,
            direction: body.direction,
            isLifetime: body.isLifetime,
            isActive: body.isActive,
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'centro de costo actualizado');
        
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
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_COST_CENTER'])
      if (validatePermission) {
        let query = `SELECT * FROM costCenters WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR direction LIKE '%${wherecond}%' AND isActive = ${isActive} OR serial LIKE '%${wherecond}%' AND isActive = ${isActive} OR serial_license LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const CostCenters = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, CostCenters);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = CostCenterService;