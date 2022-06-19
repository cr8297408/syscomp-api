const Joi = require('joi');
const Payment = require('./model');

/**
 * @export
 * @class PaymentValidation
 * 
 */
class PaymentValidation {
    /**
     * create an instance of PaymentValidation
     * @memberof PaymentValidation
     * @param {Payment}
     * @returns {Joi.validationResult}
     */

    createPayment(body){
      const schema = Joi.object().keys({
        FactureId: Joi.string().required(),
        observations: Joi.string(),
        amount: Joi.number().required(),
        date: Joi.date().required(),
        checked: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getPayment(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new PaymentValidation();