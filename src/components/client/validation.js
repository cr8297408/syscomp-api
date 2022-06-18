const Joi = require('joi');
const Client = require('./model');

/**
 * @export
 * @class ClientValidation
 * 
 */
class ClientValidation {
    /**
     * create an instance of ClientValidation
     * @memberof ClientValidation
     * @param {Client}
     * @returns {Joi.validationResult}
     */

    createClient(body){
      const schema = Joi.object().keys({
        businessName: Joi.string().required(),
        nit: Joi.string().required(),
        repLegalContact: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        municipality: Joi.string().required(),
        department: Joi.string().required(),
        country: Joi.string().required(),
        email: Joi.string().required(),
        contactDate: Joi.string(),
        direction: Joi.string().required()
        
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getClient(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ClientValidation();