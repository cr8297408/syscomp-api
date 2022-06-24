const CostCenterService = require('./service');


async function findAll(req, res, next) {
  try {
    const CostCenters = await CostCenterService.findAll(req.headers['authorization'])
    res.status(200).json(CostCenters)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getCostCenter = await CostCenterService.create(req.headers['authorization'],req.body);
    res.status(201).json(getCostCenter)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getCostCenter = await CostCenterService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getCostCenter)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const CostCenter = await CostCenterService.delete(req.headers['authorization'],req.params.id)

    res.json(CostCenter)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const CostCenter = await CostCenterService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(CostCenter)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const CostCenters = await CostCenterService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(CostCenters)    
  } catch (error) {
      throw new Error(error.message)
  }
}

async function activateCostCenter(req, res){
  try {
    const getCostCenter = await CostCenterService.activateCostCenter(req.headers['authorization'],req.params.id)

    res.json(getCostCenter)
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
  activateCostCenter
}