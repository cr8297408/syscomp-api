const db = require('../../config/connection/connectBd');
const PaymentValidation = require('./validation');
const Payment = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Payment} model
 */
const PaymentService = {
  /**
   * @exports
   * @implements {Payment} model
   * @description get all Payments 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_PAYMENT'])
      if (validatePermission) {
        const Payments = await Payment.findAll()
        return Payments;
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
   * @implements {Payment} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PAYMENT'])
      if (validatePermission) {
        const validate = PaymentValidation.createPayment(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createPayment = await Payment.create(body);
        return createPayment;
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
   * @implements {Payment} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_PAYMENT'])
      if (validatePermission) {
        const validate = PaymentValidation.getPayment(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getPayment = await Payment.findByPk(id)
        return getPayment;
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
   * @implements {Payment} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PAYMENT'])
      if (validatePermission) {
        const validate = await PaymentValidation.getPayment(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getPayment = await Payment.findByPk(id);
        
        await getPayment.destroy()

        return getPayment;
        
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
   * @description update a Payment in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PAYMENT'])
      if (validatePermission) {
        
        const validateid = await PaymentValidation.getPayment(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await PaymentValidation.createPayment(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newPayment = await Payment.update(
          {
            observations: body.observations,
            amount: body.amount,
            date: body.date,
            checked: body.checked
          },
          {where: {id}}
        )
  
        return newPayment;
        
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
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PAYMENT'])
      if (validatePermission) {
        const Payments = await Pagination('Payments',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Payments
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

module.exports = PaymentService;