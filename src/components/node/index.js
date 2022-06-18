const NodeService = require('./service');


async function findAll(req, res, next) {
  try {
    const Nodes = await NodeService.findAll(req.headers['authorization'])
    res.status(200).json(Nodes)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getNode = await NodeService.create(req.headers['authorization'],req.body);
    res.status(201).json(getNode)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getNode = await NodeService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getNode)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Node = await NodeService.delete(req.headers['authorization'],req.params.id)

    res.json(Node)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Node = await NodeService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Node)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Nodes = await NodeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Nodes)    
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