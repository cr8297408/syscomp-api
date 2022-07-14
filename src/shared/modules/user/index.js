const UserService = require('./service');


async function findAll(req, res, next) {
  try {
    const Users = await UserService.findAll(req.headers['authorization'])
    res.status(Users.status).json(Users.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUser = await UserService.create(req.headers['authorization'],req.body);
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getUser = await UserService.findOne(req.headers['authorization'],req.params.id)
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getUser = await UserService.delete(req.headers['authorization'],req.params.id)

    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function activateUser(req, res){
  try {
    const getUser = await UserService.activateUser(req.headers['authorization'],req.params.id)

    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getUser = await UserService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Users = await UserService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Users.status).json(Users.message)    
  } catch (error) {
      throw new Error(error.message)
  }
}

async function putAvatar(req, res) {
  try {
    const {originalname, path} = req.file;
    const avatar = await UserService.putAvatar(req.headers['authorization'], originalname, path)
    res.status(avatar.status).json(avatar.message)
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne,
  findpagination,
  activateUser,
  putAvatar,
}