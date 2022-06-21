const db = require('../../config/connection/connectBd');
const NodeValidation = require('./validation');
const Node = require('./model');
const CostCenter = require('../cost-center/model');
const License = require('../license/model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Node} model
 */
const NodeService = {
  /**
   * @exports
   * @implements {Node} model
   * @description get all Nodes 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Nodes = await Node.findAll()
        return Nodes;
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
   * @implements {Node} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'ALTER_USER')
      if (validatePermission) {
        const validate = NodeValidation.createNode(body);
        if (validate.error) {
          throw new Error(validate.error)
        }

        const costCenterNode = await CostCenter.findByPk(body.CostCenterId);

        const LicenseCostCenter = await License.findByPk(costCenterNode.LicenseId);
        
        if (!costCenterNode) {
          throw new error('referencia con centro de costo invalida...')
        }
        

        const createNode = await Node.create(
          {
            initDate: body.initDate ,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit ,
            isLifetime: body.isLifetime ,
            isActive: body.isActive ,
            CostCenterId: body.CostCenterId, 
          }
        );
        let serialChil = costCenterNode.serial+'_'+createNode.serial;
        const serialUpdate = await Node.update({
          serial: serialChil
        },
          {where: {id: createNode.id}}
        )
        const priceAct = await License.update({
          price: body.price+LicenseCostCenter.price
        }, {
          where: {id: costCenterNode.LicenseId}
        })
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
   * @implements {Node} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = NodeValidation.getNode(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getNode = await Node.findByPk(id)
        return getNode;
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
   * @implements {Node} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'ALTER_USER')
      if (validatePermission) {
        const validate = await NodeValidation.getNode(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getNode = await Node.findByPk(id);
        
        await getNode.destroy()

        return getNode;
        
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
   * @description update a Node in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'ALTER_USER')
      if (validatePermission) {
        
        const validateid = await NodeValidation.getNode(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await NodeValidation.createNode(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newNode = await Node.update(
          {
            initDate: body.initDate ,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit ,
            isLifetime: body.isLifetime ,
            isActive: body.isActive ,
          },
          {where: {id}}
        )
  
        return newNode;
        
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
        const Nodes = await Pagination('Nodes',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Nodes
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

module.exports = NodeService;