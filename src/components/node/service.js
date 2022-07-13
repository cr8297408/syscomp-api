const db = require('../../config/connection/connectBd');
const NodeValidation = require('./validation');
const Node = require('./model');
const CostCenter = require('../cost-center/model');
const License = require('../license/model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpError = require('../../shared/errors');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_NODE'])
      if (validatePermission) {
        const Nodes = await Node.findAll()
        return Nodes;
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
   * @implements {Node} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_NODE'])
      if (validatePermission) {
        const validate = NodeValidation.createNode(body);
        if (validate.error) {
          new HttpError(400, validate.error)
        }

        const costCenterNode = await CostCenter.findByPk(body.CostCenterId);

        const LicenseCostCenter = await License.findByPk(costCenterNode.LicenseId);
        
        if (!costCenterNode) {
          new HttpError(400, 'referencia con centro de costo invalida...');
        }
        

        const createNode = await Node.create(
          {
            initDate: body.initDate ,
            serialCost: costCenterNode.serial,
            finishDate: body.finishDate ,
            price: body.price ,
            debit: body.debit ,
            isLifetime: body.isLifetime ,
            isActive: body.isActive ,
            CostCenterId: body.CostCenterId, 
          }
        );
        

        return createNode;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Node} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_NODE'])
      if (validatePermission) {
        const validate = NodeValidation.getNode(id);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
        const getNode = await Node.findByPk(id)
        return getNode;
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
   * @implements {Node} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_NODE'])
      if (validatePermission) {
        const validate = await NodeValidation.getNode(id)

        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        const getNode = await Node.findByPk(id);
        
        await getNode.destroy()

        return getNode;
        
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
   * @description update a Node in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_NODE'])
      if (validatePermission) {
        
        const validateid = await NodeValidation.getNode(id);
        
        if (validateid.error) {
          return new HttpError(400, validateid.error);
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
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_NODE'])
      if (validatePermission) {
        const Nodes = await Pagination('Nodes',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Nodes
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  }
}

module.exports = NodeService;