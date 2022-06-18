const UserService = require('./service');


async function findAll(req, res, next) {
  try {
    const Users = await UserService.findAll(req.headers['authorization'])
    res.status(200).json(Users)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUser = await UserService.create(req.headers['authorization'],req.body);
    res.status(201).json(getUser)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getUser = await UserService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getUser)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getUser = await UserService.delete(req.headers['authorization'],req.params.id)

    res.json(getUser)
  } catch (error) {
    res.json(error.message)
  }
}

async function activateUser(req, res){
  try {
    const getUser = await UserService.activateUser(req.headers['authorization'],req.params.id)

    res.json(getUser)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getUser = await UserService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(getUser)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Users = await UserService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Users)    
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
  findpagination,
  activateUser
}