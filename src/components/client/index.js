const ClientService = require('./service');


async function findAll(req, res, next) {
  try {
    const Clients = await ClientService.findAll(req.headers['authorization'])
    res.status(200).json(Clients)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getClient = await ClientService.create(req.headers['authorization'],req.body);
    res.status(201).json(getClient)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getClient = await ClientService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getClient)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Client = await ClientService.delete(req.headers['authorization'],req.params.id)

    res.json(Client)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Client = await ClientService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Client)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Clients = await ClientService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Clients)    
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