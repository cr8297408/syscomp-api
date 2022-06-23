const SupportTicketService = require('./service');


async function findAll(req, res, next) {
  try {
    const SupportTickets = await SupportTicketService.findAll(req.headers['authorization'])
    res.status(200).json(SupportTickets)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getSupportTicket = await SupportTicketService.create(req.headers['authorization'],req.body);
    res.status(201).json(getSupportTicket)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getSupportTicket = await SupportTicketService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getSupportTicket)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const SupportTicket = await SupportTicketService.delete(req.headers['authorization'],req.params.id)

    res.json(SupportTicket)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const SupportTicket = await SupportTicketService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(SupportTicket)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const SupportTickets = await SupportTicketService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(SupportTickets)    
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