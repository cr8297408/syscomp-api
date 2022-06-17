const __name__Service = require('./service');


async function findAll(req, res, next) {
  try {
    const __name__s = await __name__Service.findAll(req.headers['authorization'])
    res.status(200).json(__name__s)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const get__name__ = await __name__Service.create(req.headers['authorization'],req.body);
    res.status(201).json(get__name__)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const get__name__ = await __name__Service.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(get__name__)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const __name__ = await __name__Service.delete(req.headers['authorization'],req.params.id)

    res.json(__name__)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const __name__ = await __name__Service.update(req.headers['authorization'],req.params.id, req.body)
    res.json(__name__)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const __name__s = await __name__Service.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(__name__s)    
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