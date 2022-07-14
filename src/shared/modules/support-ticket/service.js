const db = require('../../../config/connection/connectBd');
const SupportTicketValidation = require('./validation');
const SupportTicket = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const HttpResponse = require('../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {SupportTicket} model
 */
const SupportTicketService = {
  /**
   * @exports
   * @implements {SupportTicket} model
   * @description get all SupportTickets 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_SUPPORT_TICKET'])
      if (validatePermission) {
        const SupportTickets = await SupportTicket.findAll()
        return new HttpResponse(200, SupportTickets);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {SupportTicket} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_SUPPORT_TICKET'])
      if (validatePermission) {
        const validate = SupportTicketValidation.createSupportTicket(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
  
        const createSupportTicket = await SupportTicket.create(body);
        return new HttpResponse(200, 'ticket de soporte creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {SupportTicket} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_SUPPORT_TICKET'])
      if (validatePermission) {
        const validate = SupportTicketValidation.getSupportTicket(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getSupportTicket = await SupportTicket.findByPk(id)
        return new HttpResponse(200, getSupportTicket);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {SupportTicket} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_SUPPORT_TICKET'])
      if (validatePermission) {
        const validate = await SupportTicketValidation.getSupportTicket(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getSupportTicket = await SupportTicket.findByPk(id);
        
        await getSupportTicket.destroy()

        return new HttpResponse(200, 'ticket de soporte eliminado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a SupportTicket in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_SUPPORT_TICKET'])
      if (validatePermission) {
        
        const validateid = await SupportTicketValidation.getSupportTicket(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validate.error);
        }

        const newSupportTicket = await SupportTicket.update(
          {
            title: body.title,
            subject: body.subject,
            reason: body.reason,
            estate: body.estate,
            priority: body.priority
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'ticket de soporte actualizado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_SUPPORT_TICKET'])
      if (validatePermission) {
        const SupportTickets = await Pagination('SupportTickets',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return new HttpResponse(200, SupportTickets);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = SupportTicketService;