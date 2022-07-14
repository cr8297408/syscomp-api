const ReportTypeService = require('./service');


async function findAll(req, res, next) {
  try {
    const ReportTypes = await ReportTypeService.findAll(req.headers['authorization'])
    res.status(ReportTypes.status).json(ReportTypes.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getReportType = await ReportTypeService.create(req.headers['authorization'],req.body);
    res.status(getReportType.status).json(getReportType.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getReportType = await ReportTypeService.findOne(req.headers['authorization'],req.params.id)
    res.status(getReportType.status).json(getReportType.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ReportType = await ReportTypeService.delete(req.headers['authorization'],req.params.id)

    res.status(ReportType.status).json(ReportType.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ReportType = await ReportTypeService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ReportType.status).json(ReportType.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ReportTypes = await ReportTypeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ReportTypes.status).json(ReportTypes.message)    
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
  findpagination
}