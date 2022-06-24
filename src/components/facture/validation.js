const Joi = require('joi');
const Facture = require('./model');

/**
 * @export
 * @class FactureValidation
 * 
 */
class FactureValidation {
    /**
     * create an instance of FactureValidation
     * @memberof FactureValidation
     * @param {Facture}
     * @returns {Joi.validationResult}
     */

    createFacture(body){
      const schema = Joi.object().keys({
        ClientId: Joi.string().required(),
        LicenseId: Joi.string().required(),
        UserId: Joi.string().required(),
        observation: Joi.string().required(),
        amount: Joi.number(),
        limitDate: Joi.date().required(),
        rememberDate: Joi.date().required(),
        paidOut: Joi.boolean(),
        estate: Joi.string()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getFacture(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new FactureValidation();