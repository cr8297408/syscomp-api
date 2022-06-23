const Joi = require('joi');
const SupportTicket = require('./model');

/**
 * @export
 * @class SupportTicketValidation
 * 
 */
class SupportTicketValidation {
    /**
     * create an instance of SupportTicketValidation
     * @memberof SupportTicketValidation
     * @param {SupportTicket}
     * @returns {Joi.validationResult}
     */

    createSupportTicket(body){
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        subject: Joi.string().required(),
        reason: Joi.string().required(),
        estate: Joi.string(),
        priority: Joi.string(),
        TypeTicketId: Joi.string().required(),
        UserId: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getSupportTicket(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new SupportTicketValidation();