const TicketThreadService = require('./service');


async function findAll(req, res, next) {
  try {
    const TicketThreads = await TicketThreadService.findAll(req.headers['authorization'])
    res.status(TicketThreads.status).json(TicketThreads.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getTicketThread = await TicketThreadService.create(req.headers['authorization'],req.body);
    res.status(getTicketThread.status).json(getTicketThread.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getTicketThread = await TicketThreadService.findOne(req.headers['authorization'],req.params.id)
    res.status(getTicketThread.status).json(getTicketThread.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const TicketThread = await TicketThreadService.delete(req.headers['authorization'],req.params.id)

    res.status(getTicketThread.status).json(getTicketThread.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const TicketThread = await TicketThreadService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(TicketThread.status).json(TicketThread.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const TicketThreads = await TicketThreadService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(TicketThreads.status).json(TicketThreads.message)   
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