const db = require('../../config/connection/connectBd');
const CostCenterValidation = require('./validation');
const CostCenter = require('./model');
const License = require('../license/model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const { UUIDV4 } = require('sequelize');
const Node = require('../node/model');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const CostCenters = await CostCenter.findAll()
        return CostCenters;
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
   * @implements {CostCenter} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = CostCenterValidation.createCostCenter(body);
        if (validate.error) {
          throw new Error(validate.error)
        }

        const LicenseCostCenter = await License.findByPk(body.LicenseId);

        if (!LicenseCostCenter) {
          throw new Error('licencia invalida...')
        }

        const CostCentersLicense = await CostCenter.findOne({
          where: {
            LicenseId: LicenseCostCenter.id
          }
        })


        if (LicenseCostCenter.type == 'SERVER' && CostCentersLicense) {
          throw new Error('tu licencia es tipo servidor por ende solo puede tener un centro de costo.')
        }
  
        const createCostCenter = await CostCenter.create({
          LicenseId: body.LicenseId,
          name: body.name,
          initDate: body.initDate ,
          finishDate: body.finishDate ,
          price: body.price ,
          debit: body.debit ,
          direction: body.direction ,
          nodes: body.nodes ,
          isLifetime: body.isLifetime ,
          isActive: body.isActive ,
        });
        let serialChil = LicenseCostCenter.serial+'_'+createCostCenter.serial;
        const serialUpdate = await CostCenter.update({
          serial: serialChil
        },
          {where: {id: createCostCenter.id}}
        )

        return serialUpdate;
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
   * @implements {CostCenter} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = CostCenterValidation.getCostCenter(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getCostCenter = await CostCenter.findByPk(id)
        return getCostCenter;
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
   * @implements {CostCenter} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await CostCenterValidation.getCostCenter(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getCostCenter = await CostCenter.findByPk(id);
        
        await getCostCenter.destroy()

        return getCostCenter;
        
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
   * @description update a User in the db
   */

     async activateCostCenter(bearerHeader,id, body){
      try {
        const validatePermission = await permissions(bearerHeader, 'UPDATE')
        if (validatePermission) {
          const validate = await CostCenterValidation.getCostCenter(id)
    
          if (validate.error) {
            throw new Error(validate.error)
          }
          const newCostCenter = await CostCenter.update(
            {
              isActive: true,
            },
            {where: {id}}
          )
    
          return newCostCenter;
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
   * @description update a CostCenter in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await CostCenterValidation.getCostCenter(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await CostCenterValidation.createCostCenter(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newCostCenter = await CostCenter.update(
          {
            name: body.name,
            initDate: body.initDate ,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit ,
            direction: body.direction ,
            nodes: body.nodes ,
            isLifetime: body.isLifetime ,
            isActive: body.isActive ,
          },
          {where: {id}}
        )
  
        return newCostCenter;
        
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
        const CostCenters = await Pagination('CostCenters',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return CostCenters
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

module.exports = CostCenterService;