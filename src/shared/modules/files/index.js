const FileService = require('./service');


async function findAll(req, res, next) {
  try {
    const Files = await FileService.findAll(req.headers['authorization'])
    res.status(Files.status).json(Files.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const {path, originalname} = req.file;
    const getFile = await FileService.create(req.headers['authorization'],req.body, path, originalname);
    res.status(getFile.status).json(getFile.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getFile = await FileService.findOne(req.headers['authorization'],req.params.id)
    res.status(getFile.status).json(getFile.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const File = await FileService.delete(req.headers['authorization'],req.params.id)

    res.status(File.status).json(File.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const File = await FileService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(File.status).json(File.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Files = await FileService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Files.status).json(Files.message)    
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