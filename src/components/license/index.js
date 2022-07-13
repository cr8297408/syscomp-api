const LicenseService = require('./service');


async function findAll(req, res, next) {
  try {
    const Licenses = await LicenseService.findAll(req.headers['authorization'])
    res.json(Licenses)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getLicense = await LicenseService.create(req.headers['authorization'],req.body);
    res.json(getLicense)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getLicense = await LicenseService.findOne(req.headers['authorization'],req.params.id)
    res.json(getLicense)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const License = await LicenseService.delete(req.headers['authorization'],req.params.id)

    res.json(License)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const License = await LicenseService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(License)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Licenses = await LicenseService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Licenses)    
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