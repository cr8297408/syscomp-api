const Joi = require('joi');
const User = require('./model');

/**
 * @export
 * @class UserValidation
 * 
 */
class UserValidation {
    /**
     * create an instance of UserValidation
     * @memberof UserValidation
     * @param {User}
     * @returns {Joi.validationResult}
     */

    createUser(body){
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email({ 
          minDomainSegments: 2,
        }).required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        roles: Joi.object().required(),
        profile: Joi.object(),
        isActive: Joi.boolean(),
        isAdmin: Joi.boolean(),
        avatarFile: Joi.string(),
        typeUser: Joi.string()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getUser(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new UserValidation();