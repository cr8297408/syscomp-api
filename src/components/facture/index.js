const FactureService = require('./service');


async function findAll(req, res, next) {
  try {
    const Factures = await FactureService.findAll(req.headers['authorization'])
    res.status(Factures.status).json(Factures.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getFacture = await FactureService.create(req.headers['authorization'],req.body);
    res.status(getFacture.status).json(getFacture.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getFacture = await FactureService.findOne(req.headers['authorization'],req.params.id)
    res.status(getFacture.status).json(getFacture.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Facture = await FactureService.delete(req.headers['authorization'],req.params.id)

    res.status(Facture.status).json(Facture.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Facture = await FactureService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Facture.status).json(Facture.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Factures = await FactureService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Factures.status).json(Factures.message)    
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