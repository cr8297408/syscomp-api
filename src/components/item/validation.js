const Joi = require('joi');
const Item = require('./model');

/**
 * @export
 * @class ItemValidation
 * 
 */
class ItemValidation {
    /**
     * create an instance of ItemValidation
     * @memberof ItemValidation
     * @param {Item}
     * @returns {Joi.validationResult}
     */

    createItem(body){
      const schema = Joi.object().keys({
        sum: Joi.number().required(),
        amount: Joi.number().required(),
        description: Joi.string(),
        FactureId: Joi.string().required()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getItem(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ItemValidation();