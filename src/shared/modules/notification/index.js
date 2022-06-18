const NotificationService = require('./service');


async function findAll(req, res, next) {
  try {
    const Notifications = await NotificationService.findAll(req.headers['authorization'])
    res.status(200).json(Notifications)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getNotification = await NotificationService.create(req.headers['authorization'],req.body);
    res.status(201).json(getNotification)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getNotification = await NotificationService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getNotification)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Notification = await NotificationService.delete(req.headers['authorization'],req.params.id)

    res.json(Notification)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Notifications = await NotificationService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Notifications)    
  } catch (error) {
      throw new Error(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  findpagination
}