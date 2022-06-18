const Joi = require('joi');
const Notification = require('./model');

/**
 * @export
 * @class NotificationValidation
 * 
 */
class NotificationValidation {
    /**
     * create an instance of NotificationValidation
     * @memberof NotificationValidation
     * @param {Notification}
     * @returns {Joi.validationResult}
     */

    createNotification(body){
      const schema = Joi.object().keys({
        message: Joi.string().required(),
        type: Joi.string().required(),
        isRead: Joi.boolean(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getNotification(id) {
      const schema = Joi.string().required();

      return schema.validate(id);s
  }
}
module.exports = new NotificationValidation();