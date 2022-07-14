const CostCenterService = require('./service');


async function findAll(req, res, next) {
  try {
    const CostCenters = await CostCenterService.findAll(req.headers['authorization'])
    res.status(CostCenters.status).json(CostCenters.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getCostCenter = await CostCenterService.create(req.headers['authorization'],req.body);
    res.status(getCostCenter.status).json(getCostCenter)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getCostCenter = await CostCenterService.findOne(req.headers['authorization'],req.params.id)
    res.status(getCostCenter.status).json(getCostCenter)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const CostCenter = await CostCenterService.delete(req.headers['authorization'],req.params.id)

    res.status(CostCenter.status).json(CostCenter)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const CostCenter = await CostCenterService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(CostCenter.status).json(CostCenter)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const CostCenters = await CostCenterService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(CostCenters.status).json(CostCenters.message)    
  } catch (error) {
      throw new Error(error.message)
  }
}

async function activateCostCenter(req, res){
  try {
    const getCostCenter = await CostCenterService.activateCostCenter(req.headers['authorization'],req.params.id)

    res.status(getCostCenter.status).json(getCostCenter)
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