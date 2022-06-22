const Joi = require('joi');
const Event = require('./model');

/**
 * @export
 * @class EventValidation
 * 
 */
class EventValidation {
    /**
     * create an instance of EventValidation
     * @memberof EventValidation
     * @param {Event}
     * @returns {Joi.validationResult}
     */

    createEvent(body){
      const schema = Joi.object().keys({
        icon: Joi.string(),
        subtitle: Joi.string().required(),
        title: Joi.string().required(),
        finishDate: Joi.date().required(),
        initDate: Joi.date().required(),
        description: Joi.string(),
        estate: Joi.string().required()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getEvent(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
    }

    grantEvent(body){
      const schema = Joi.object().keys({
        users: Joi.array(),
        events: Joi.array()
      })

      return schema.validate(body)
    }
}
module.exports = new EventValidation();