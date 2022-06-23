const ReportTypeService = require('./service');


async function findAll(req, res, next) {
  try {
    const ReportTypes = await ReportTypeService.findAll(req.headers['authorization'])
    res.status(200).json(ReportTypes)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getReportType = await ReportTypeService.create(req.headers['authorization'],req.body);
    res.status(201).json(getReportType)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getReportType = await ReportTypeService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getReportType)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ReportType = await ReportTypeService.delete(req.headers['authorization'],req.params.id)

    res.json(ReportType)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ReportType = await ReportTypeService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ReportType)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ReportTypes = await ReportTypeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ReportTypes)    
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