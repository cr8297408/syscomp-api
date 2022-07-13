const db = require('../../../config/connection/connectBd');
const TicketThreadValidation = require('./validation');
const TicketThread = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const sendMail = require('../../resources/send-mail');
const {TemplateSign} = require('../../resources/getTemplate');
const config = require('../../../config/env');
const getUser = require('../../middlewares/getUser');
const SupportTicket = require('../support-ticket/model');
const User = require('../user/model');
const HttpError = require('../../errors');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {TicketThread} model
 */
const TicketThreadService = {
  /**
   * @exports
   * @implements {TicketThread} model
   * @description get all TicketThreads 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_TICKET_THREAD'])
      if (validatePermission) {
        const TicketThreads = await TicketThread.findAll()
        return TicketThreads;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpError(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {TicketThread} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_TICKET_THREAD'])
      if (validatePermission) {
        const validate = TicketThreadValidation.createTicketThread(body);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
        const ticketT = await TicketThread.create(body)
        const user = await getUser(bearerHeader);

        const userManager = await SupportTicket.findByPk(body.SupportTicketId);

        const emailManager = await User.findByPk(userManager.UserId);

        const contactLink = 'https://conexionpos.com/contacto'
  
        const emailFrom = config.MAIL_USER;
        const emailTo = emailManager.email;
        const subject = 'hilo de ticket'
        const textPrincipal = `el usuario ${user.email}, ha abierto un hilo con id: ${ticketT.id}, `
        const html = TemplateSign(textPrincipal, body.username, contactLink)
        await sendMail('syscomp', emailFrom, emailTo, subject,html)

        return ticketT;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {TicketThread} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_TICKET_THREAD'])
      if (validatePermission) {
        const validate = TicketThreadValidation.getTicketThread(id);
        if (validate.error) {
          return new HttpError(400, validate.error);
        }
        const getTicketThread = await TicketThread.findByPk(id)
        return getTicketThread;
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {TicketThread} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_TICKET_THREAD'])
      if (validatePermission) {
        const validate = await TicketThreadValidation.getTicketThread(id)

        if (validate.error) {
          return new HttpError(400, validate.error);
        }

        const getTicketThread = await TicketThread.findByPk(id);
        
        await getTicketThread.destroy()

        return getTicketThread;
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a TicketThread in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_TICKET_THREAD'])
      if (validatePermission) {
        
        const validateid = await TicketThreadValidation.getTicketThread(id);
        
        if (validateid.error) {
          return new HttpError(400, validateid.error);
        }
  
        const newTicketThread = await TicketThread.update(
          {
            response: body.respose, 
            fecha: body.date,
            estate:body.estate,
          },
          {where: {id}}
        )
  
        return newTicketThread;
        
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_TICKET_THREAD'])
      if (validatePermission) {
        const TicketThreads = await Pagination('TicketThreads',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return TicketThreads
      } 
      const err = new HttpError(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpError(400, error.message);
    }
  },
}

module.exports = TicketThreadService;