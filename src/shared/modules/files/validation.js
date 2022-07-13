const Joi = require('joi');
const File = require('./model');

/**
 * @export
 * @class FileValidation
 * 
 */
class FileValidation {
    /**
     * create an instance of FileValidation
     * @memberof FileValidation
     * @param {File}
     * @returns {Joi.validationResult}
     */

    createFile(body){
      const schema = Joi.object().keys({
        description: Joi.string().required(),
        filename: Joi.string().required(),
        url: Joi.string(),
        key: Joi.string().required(),
        bytes: Joi.number(),
        storage: Joi.string(),
        status: Joi.string(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getFile(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new FileValidation();