const db = require('../../../config/connection/connectBd');
const FileValidation = require('./validation');
const File = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const FileAwsService = require('./aws-cloud-service');
const getUser = require('../../middlewares/getUser');

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
        return Files;
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
   * @implements {File} model 
   */
  async create(bearerHeader, body, path, originalname) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_FILE'])
      if (validatePermission) {
        const validate = FileValidation.createFile(body);
        if (validate.error) {
          return new HttpError(400, validate.error);
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
  
        return createFile;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
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
          return new HttpError(400, validate.error);
        }
        const getFile = await File.findByPk(id)
        return getFile;
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
   * @implements {File} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_FILE'])
      if (validatePermission) {
        const validate = await FileValidation.getFile(id)

        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        const getFile = await File.findByPk(id);
        
        await getFile.destroy()

        return getFile;
        
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
   * @description update a File in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_FILE'])
      if (validatePermission) {
        
        const validateid = await FileValidation.getFile(id);
        
        if (validateid.error) {
          return new HttpError(400, validateID.error);
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
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newFile;
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_FILE'])
      if (validatePermission) {
        const Files = await Pagination('Files',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Files
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = FileService;