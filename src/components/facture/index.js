const FactureService = require('./service');


async function findAll(req, res, next) {
  try {
    const Factures = await FactureService.findAll(req.headers['authorization'])
    res.status(200).json(Factures)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getFacture = await FactureService.create(req.headers['authorization'],req.body);
    res.status(201).json(getFacture)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getFacture = await FactureService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getFacture)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Facture = await FactureService.delete(req.headers['authorization'],req.params.id)

    res.json(Facture)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Facture = await FactureService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Facture)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Factures = await FactureService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Factures)    
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