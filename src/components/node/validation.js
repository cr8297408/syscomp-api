const Joi = require('joi');
const Node = require('./model');

/**
 * @export
 * @class NodeValidation
 * 
 */
class NodeValidation {
    /**
     * create an instance of NodeValidation
     * @memberof NodeValidation
     * @param {Node}
     * @returns {Joi.validationResult}
     */

    createNode(body){
      const schema = Joi.object().keys({
        CostCenterId: Joi.string().required(),
        initDate: Joi.string(),
        finishDate: Joi.string().required(),
        price: Joi.number().required(),
        isLifetime: Joi.boolean(),
        isActive: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getNode(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new NodeValidation();