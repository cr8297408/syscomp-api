const Joi = require('joi');
const License = require('./model');

/**
 * @export
 * @class LicenseValidation
 * 
 */
class LicenseValidation {
    /**
     * create an instance of LicenseValidation
     * @memberof LicenseValidation
     * @param {License}
     * @returns {Joi.validationResult}
     */

    createLicense(body){
      const schema = Joi.object().keys({
        ClientId: Joi.string().required(),
        type: Joi.string(),
        description: Joi.string(),
        start_date: Joi.date(),
        expired_date: Joi.date().required(),
        isActive: Joi.boolean(),
        isLifetime: Joi.boolean(),
        price: Joi.number()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getLicense(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new LicenseValidation();