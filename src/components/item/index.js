const ItemService = require('./service');


async function findAll(req, res, next) {
  try {
    const Items = await ItemService.findAll(req.headers['authorization'])
    res.status(Items.status).json(Items.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getItem = await ItemService.create(req.headers['authorization'],req.body);
    res.status(getItem.status).json(getItem.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getItem = await ItemService.findOne(req.headers['authorization'],req.params.id)
    res.status(getItem.status).json(getItem.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Item = await ItemService.delete(req.headers['authorization'],req.params.id)

    res.status(Item.status).json(Item.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Item = await ItemService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Item.status).json(Item.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Items = await ItemService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Items.status).json(Items.message)    
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