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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const TicketThreads = await TicketThread.findAll()
        return TicketThreads;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {TicketThread} model 
   */
  async create(bearerHeader, body) {
    try {
      // const validatePermission = await permissions(bearerHeader, 'CREATE')
      // if (validatePermission) {
        const validate = TicketThreadValidation.createTicketThread(body);
        if (validate.error) {
          throw new Error(validate.error)
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
      // } 
      // return {
      //   message: 'no tienes permisos para esta acción',
      //   status: 401
      // }
      
    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {TicketThread} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = TicketThreadValidation.getTicketThread(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getTicketThread = await TicketThread.findByPk(id)
        return getTicketThread;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {TicketThread} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await TicketThreadValidation.getTicketThread(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getTicketThread = await TicketThread.findByPk(id);
        
        await getTicketThread.destroy()

        return getTicketThread;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await TicketThreadValidation.getTicketThread(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await TicketThreadValidation.createTicketThread(body)
        if (validateBody.error) {
          throw new Error(validate.error)
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
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const TicketThreads = await Pagination('TicketThreads',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return TicketThreads
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
        throw new Error(error.message);
    }
  },
}

module.exports = TicketThreadService;