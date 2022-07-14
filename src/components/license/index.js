const LicenseService = require('./service');


async function findAll(req, res, next) {
  try {
    const Licenses = await LicenseService.findAll(req.headers['authorization'])
    res.status(Licenses.status).json(Licenses.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getLicense = await LicenseService.create(req.headers['authorization'],req.body);
    res.status(getLicense.status).json(getLicense.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getLicense = await LicenseService.findOne(req.headers['authorization'],req.params.id)
    res.status(getLicense.status).json(getLicense.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const License = await LicenseService.delete(req.headers['authorization'],req.params.id)

    res.status(License.status).json(License.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const License = await LicenseService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(License.status).json(License.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Licenses = await LicenseService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Licenses.status).json(Licenses.message)    
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