const ItemService = require('./service');


async function findAll(req, res, next) {
  try {
    const Items = await ItemService.findAll(req.headers['authorization'])
    res.status(200).json(Items)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getItem = await ItemService.create(req.headers['authorization'],req.body);
    res.status(201).json(getItem)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getItem = await ItemService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getItem)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Item = await ItemService.delete(req.headers['authorization'],req.params.id)

    res.json(Item)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Item = await ItemService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Item)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Items = await ItemService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Items)    
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