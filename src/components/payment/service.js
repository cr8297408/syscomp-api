const db = require('../../config/connection/connectBd');
const PaymentValidation = require('./validation');
const Payment = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');
const getUser = require('../../shared/middlewares/getUser');

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
        return new HttpResponse(200, Payments);
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
   * @implements {Payment} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_PAYMENT'])
      if (validatePermission) {
        const validate = PaymentValidation.createPayment(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
  
        const user = await getUser(bearerHeader)
        const createPayment = await Payment.create({
          FactureId: body.FactureId,
          observations: body.observations,
          amount: body.amount,
          date: body.date,
          checked: body.checked,
          createdBy: user.id
        });
        return createPayment;
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
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
          return new HttpResponse(400, validate.error);
        }
        const getPayment = await Payment.findByPk(id)
        return new HttpResponse(200, getPayment);
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
   * @implements {Payment} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_PAYMENT'])
      if (validatePermission) {
        const validate = await PaymentValidation.getPayment(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getPayment = await Payment.findByPk(id);
        
        await getPayment.destroy()

        return new HttpResponse(200, getPayment);
        
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
   * @description update a Payment in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_PAYMENT'])
      if (validatePermission) {
        
        const validateid = await PaymentValidation.getPayment(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error);
        }

        const user = await getUser(bearerHeader)
        const newPayment = await Payment.update(
          {
            observations: body.observations,
            amount: body.amount,
            date: body.date,
            checked: body.checked,
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, newPayment);
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      if(isActive == undefined || typeof(isActive) !== 'boolean'){
        isActive = true
      }
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_PAYMENT'])
      if (validatePermission) {
        let query = `SELECT * FROM payments WHERE observations LIKE '%${wherecond}%' AND isActive = ${isActive} OR FactureId LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Payments = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Payments);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = PaymentService;