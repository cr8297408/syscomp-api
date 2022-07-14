const ClientService = require('./service');


async function findAll(req, res, next) {
  try {
    const Clients = await ClientService.findAll(req.headers['authorization'])
    res.status(Clients.status).json(Clients.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getClient = await ClientService.create(req.headers['authorization'],req.body);
    res.status(getClient.status).json(getClient.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getClient = await ClientService.findOne(req.headers['authorization'],req.params.id)
    res.status(getClient.status).json(getClient.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Client = await ClientService.delete(req.headers['authorization'],req.params.id)
    res.status(Client.status).json(Client.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Client = await ClientService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Client.status).json(Client.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Clients = await ClientService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Clients.status).json(Clients.message)   
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