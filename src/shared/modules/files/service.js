const db = require('../../../config/connection/connectBd');
const FileValidation = require('./validation');
const File = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const FileAwsService = require('./aws-cloud-service');
const getUser = require('../../middlewares/getUser');
const HttpResponse = require('../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {File} model
 */
const FileService = {
  /**
   * @exports
   * @implements {File} model
   * @description get all Files 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_FILE'])
      if (validatePermission) {
        const Files = await File.findAll()
        return new HttpResponse(200, Files);
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
   * @implements {File} model 
   */
  async create(bearerHeader, body, path, originalname) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_FILE'])
      if (validatePermission) {
        const validate = FileValidation.createFile(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);
        const createFile = await File.create({
          description: body.description,
          filename: body.filename,
          url: body.url,
          key: body.key,
          bytes: body.bytes,
          storage: body.storage,
          status: body.status,
          createdBy: user.id
        });

        if(body.storage == 'AWS'){
          const uploadAws = FileAwsService.uploadFile(path, originalname)
        }
  
        return new HttpResponse(200, 'archivo subido');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {File} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_FILE'])
      if (validatePermission) {
        const validate = FileValidation.getFile(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getFile = await File.findByPk(id)
        return new HttpResponse(200, getFile);
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
   * @implements {File} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_FILE'])
      if (validatePermission) {
        const validate = await FileValidation.getFile(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getFile = await File.findByPk(id);
        
        await getFile.destroy()

        return new HttpResponse(200, 'archivo eliminado');
        
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
   * @description update a File in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_FILE'])
      if (validatePermission) {
        
        const validateid = await FileValidation.getFile(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }
  
        const newFile = await File.update(
          {
            description: body.description,
            filename: body.filename,
            url: body.url,
            key: body.key,
            bytes: body.bytes,
            storage: body.storage,
            status: body.status,
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'informacion de archivo actualizada');
        
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
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_FILE'])
      if (validatePermission) {
        let query = `SELECT * FROM files WHERE filename LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Files = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Files);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = FileService;