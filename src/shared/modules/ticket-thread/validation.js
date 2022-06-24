const Joi = require('joi');
const TicketThread = require('./model');

/**
 * @export
 * @class TicketThreadValidation
 * 
 */
class TicketThreadValidation {
    /**
     * create an instance of TicketThreadValidation
     * @memberof TicketThreadValidation
     * @param {TicketThread}
     * @returns {Joi.validationResult}
     */

    createTicketThread(body){
      const schema = Joi.object().keys({
        response: Joi.string().required(),
        date: Joi.date(),
        estate: Joi.string(),
        SupportTicketId: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getTicketThread(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new TicketThreadValidation();