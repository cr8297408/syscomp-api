const Joi = require('joi');
const ReportType = require('./model');

/**
 * @export
 * @class ReportTypeValidation
 * 
 */
class ReportTypeValidation {
    /**
     * create an instance of ReportTypeValidation
     * @memberof ReportTypeValidation
     * @param {ReportType}
     * @returns {Joi.validationResult}
     */

    createReportType(body){
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
     getReportType(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ReportTypeValidation();