const PaymentService = require('./service');


async function findAll(req, res, next) {
  try {
    const Payments = await PaymentService.findAll(req.headers['authorization'])
    res.status(200).json(Payments)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getPayment = await PaymentService.create(req.headers['authorization'],req.body);
    res.status(201).json(getPayment)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getPayment = await PaymentService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getPayment)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Payment = await PaymentService.delete(req.headers['authorization'],req.params.id)

    res.json(Payment)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Payment = await PaymentService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Payment)
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
    res.json(Payments)    
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