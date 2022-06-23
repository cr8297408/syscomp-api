const db = require('../../../config/connection/connectBd');
const SupportTicketValidation = require('./validation');
const SupportTicket = require('./model');
const Pagination = require('../../middlewares/pagination')
const permissions = require('../../middlewares/permissions')

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const SupportTickets = await SupportTicket.findAll()
        return SupportTickets;
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
   * @implements {SupportTicket} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = SupportTicketValidation.createSupportTicket(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createSupportTicket = await SupportTicket.create(body);
        return createSupportTicket;
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
   * @implements {SupportTicket} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = SupportTicketValidation.getSupportTicket(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getSupportTicket = await SupportTicket.findByPk(id)
        return getSupportTicket;
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
   * @implements {SupportTicket} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await SupportTicketValidation.getSupportTicket(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getSupportTicket = await SupportTicket.findByPk(id);
        
        await getSupportTicket.destroy()

        return getSupportTicket;
        
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
   * @description update a SupportTicket in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await SupportTicketValidation.getSupportTicket(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await SupportTicketValidation.createSupportTicket(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newSupportTicket = await SupportTicket.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newSupportTicket;
        
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
        const SupportTickets = await Pagination('SupportTickets',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return SupportTickets
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

module.exports = SupportTicketService;