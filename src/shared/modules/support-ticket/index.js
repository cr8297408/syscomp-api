const SupportTicketService = require('./service');


async function findAll(req, res, next) {
  try {
    const SupportTickets = await SupportTicketService.findAll(req.headers['authorization'])
    res.status(SupportTickets.status).json(SupportTickets.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getSupportTicket = await SupportTicketService.create(req.headers['authorization'],req.body);
    res.status(getSupportTicket.status).json(getSupportTicket.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getSupportTicket = await SupportTicketService.findOne(req.headers['authorization'],req.params.id)
    res.status(getSupportTicket.status).json(getSupportTicket.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const SupportTicket = await SupportTicketService.delete(req.headers['authorization'],req.params.id)

    res.status(SupportTicket.status).json(SupportTicket.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const SupportTicket = await SupportTicketService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(SupportTicket.status).json(SupportTicket.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const SupportTickets = await SupportTicketService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(SupportTickets.status).json(SupportTickets.message)    
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