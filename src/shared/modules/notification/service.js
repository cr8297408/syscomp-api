const db = require('../../../config/connection/connectBd');
const NotificationValidation = require('./validation');
const Notification = require('./model');
const Pagination = require('../../../shared/middlewares/pagination');
const permissions = require('../../../shared/middlewares/permissions');
const HttpResponse = require('../../response');
const getUser = require('../../middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Notification} model
 */
const NotificationService = {
  /**
   * @exports
   * @implements {Notification} model
   * @description get all Notifications 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_NOTIFICATION'])
      if (validatePermission) {
        const Notifications = await Notification.findAll()
        return new HttpResponse(200, Notifications);
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
   * @implements {Notification} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_NOTIFICATION'])
      if (validatePermission) {
        const validate = NotificationValidation.createNotification(body);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
  
        const user = await getUser(bearerHeader);
        const createNotification = await Notification.create({
          message: body.message,
          type: body.type,
          isRead: body.isRead,
          createdBy: user.id
        });
        return new HttpResponse(200, 'notificacion creada');
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Notification} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_NOTIFICATION'])
      if (validatePermission) {
        const validate = NotificationValidation.getNotification(id);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
        const getNotification = await Notification.findByPk(id)
        return new HttpResponse(200, getNotification);
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
   * @implements {Notification} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_NOTIFICATION'])
      if (validatePermission) {
        const validate = await NotificationValidation.getNotification(id)

        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        const getNotification = await Notification.findByPk(id);
        
        await getNotification.destroy()

        return new HttpResponse(200, 'notificacion eliminada');
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      if(isActive == undefined || typeof(isActive) !== 'boolean'){
        isActive = true
      }
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_NOTIFICATION'])
      if (validatePermission) {
        let query = `SELECT * FROM notifications WHERE message LIKE '%${wherecond}%' AND isActive = ${isActive} OR typeNotification LIKE '%${wherecond}%' AND isActive = ${isActive} OR module LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Notifications = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Notifications);
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = NotificationService;