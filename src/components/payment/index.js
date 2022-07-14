const PaymentService = require('./service');


async function findAll(req, res, next) {
  try {
    const Payments = await PaymentService.findAll(req.headers['authorization'])
    res.status(Payments.status).json(Payments.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getPayment = await PaymentService.create(req.headers['authorization'],req.body);
    res.status(getPayment.status).json(getPayment.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getPayment = await PaymentService.findOne(req.headers['authorization'],req.params.id)
    res.status(getPayment.status).json(getPayment.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Payment = await PaymentService.delete(req.headers['authorization'],req.params.id)

    res.status(Payment.status).json(Payment.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Payment = await PaymentService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Payment.status).json(Payment.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Payments = await PaymentService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.status(Payments.status).json(Payments.message)    
  } catch (error) {
      throw new Error(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne,
  findpagination
}