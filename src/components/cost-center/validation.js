const Joi = require('joi');
const CostCenter = require('./model');

/**
 * @export
 * @class CostCenterValidation
 * 
 */
class CostCenterValidation {
    /**
     * create an instance of CostCenterValidation
     * @memberof CostCenterValidation
     * @param {CostCenter}
     * @returns {Joi.validationResult}
     */

    createCostCenter(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        LicenseId: Joi.string().required(),
        initDate: Joi.string(),
        finishDate: Joi.string().required(),
        price: Joi.number().required(),
        debit: Joi.number().required(),
        direction: Joi.string().required(),
        nodes: Joi.object(),
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
     getCostCenter(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new CostCenterValidation();