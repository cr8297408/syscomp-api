const db = require('../../../config/connection/connectBd');
const ReportTypeValidation = require('./validation');
const ReportType = require('./model');
const Pagination = require('../../middlewares/pagination')
const permissions = require('../../middlewares/permissions');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ReportType} model
 */
const ReportTypeService = {
  /**
   * @exports
   * @implements {ReportType} model
   * @description get all ReportTypes 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ReportTypes = await ReportType.findAll()
        return ReportTypes;
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
   * @implements {ReportType} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ReportTypeValidation.createReportType(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createReportType = await ReportType.create(body);
        return createReportType;
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
   * @implements {ReportType} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ReportTypeValidation.getReportType(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getReportType = await ReportType.findByPk(id)
        return getReportType;
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
   * @implements {ReportType} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ReportTypeValidation.getReportType(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getReportType = await ReportType.findByPk(id);
        
        await getReportType.destroy()

        return getReportType;
        
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
   * @description update a ReportType in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ReportTypeValidation.getReportType(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ReportTypeValidation.createReportType(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newReportType = await ReportType.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newReportType;
        
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
        const ReportTypes = await Pagination('ReportTypes',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ReportTypes
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

module.exports = ReportTypeService;