const db = require('../../../config/connection/connectBd');
const NotificationValidation = require('./validation');
const Notification = require('./model');
const Pagination = require('../../../shared/middlewares/pagination');
const permissions = require('../../../shared/middlewares/permissions');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Notifications = await Notification.findAll()
        return Notifications;
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
   * @implements {Notification} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = NotificationValidation.createNotification(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createNotification = await Notification.create(body);
        return createNotification;
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
   * @implements {Notification} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = NotificationValidation.getNotification(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getNotification = await Notification.findByPk(id)
        return getNotification;
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
   * @implements {Notification} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await NotificationValidation.getNotification(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getNotification = await Notification.findByPk(id);
        
        await getNotification.destroy()

        return getNotification;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const Notifications = await Pagination('Notifications',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Notifications
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

module.exports = NotificationService;