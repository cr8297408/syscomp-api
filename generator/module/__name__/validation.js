const Joi = require('joi');
const __name__ = require('./model');

/**
 * @export
 * @class __name__Validation
 * 
 */
class __name__Validation {
    /**
     * create an instance of __name__Validation
     * @memberof __name__Validation
     * @param {__name__}
     * @returns {Joi.validationResult}
     */

    create__name__(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     get__name__(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new __name__Validation();