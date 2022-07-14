const db = require('../../../config/connection/connectBd');
const ReportTypeValidation = require('./validation');
const ReportType = require('./model');
const Pagination = require('../../middlewares/pagination')
const permissions = require('../../middlewares/permissions');
const HttpResponse = require('../../response');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_REPORT_TYPE'])
      if (validatePermission) {
        const ReportTypes = await ReportType.findAll()
        return new HttpResponse(200, ReportTypes);
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
   * @implements {ReportType} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_REPORT_TYPE'])
      if (validatePermission) {
        const validate = ReportTypeValidation.createReportType(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
  
        const createReportType = await ReportType.create({
          name: body.name,
          description: body.description 
        });
        return new HttpResponse(200, 'tipo de reporte agregado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {ReportType} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_REPORT_TYPE'])
      if (validatePermission) {
        const validate = ReportTypeValidation.getReportType(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getReportType = await ReportType.findByPk(id)
        return new HttpResponse(200, getReportType);
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
   * @implements {ReportType} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_REPORT_TYPE'])
      if (validatePermission) {
        const validate = await ReportTypeValidation.getReportType(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getReportType = await ReportType.findByPk(id);
        
        await getReportType.destroy()

        return new HttpResponse(200, 'tipo de reporte eliminado');
        
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
   * @description update a ReportType in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_REPORT_TYPE'])
      if (validatePermission) {
        
        const validateid = await ReportTypeValidation.getReportType(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }
  
        const newReportType = await ReportType.update(
          {
            name: body.name,
            description: body.description 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'tipo de reporte actualizado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_REPORT_TYPE'])
      if (validatePermission) {
        const ReportTypes = await Pagination('ReportTypes',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return new HttpResponse(200, ReportTypes);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = ReportTypeService;