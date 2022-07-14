const NotificationService = require('./service');


async function findAll(req, res, next) {
  try {
    const Notifications = await NotificationService.findAll(req.headers['authorization'])
    res.status(Notifications.status).json(Notifications.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getNotification = await NotificationService.create(req.headers['authorization'],req.body);
    res.status(getNotification.status).json(getNotification.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getNotification = await NotificationService.findOne(req.headers['authorization'],req.params.id)
    res.status(getNotification.status).json(getNotification.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Notification = await NotificationService.delete(req.headers['authorization'],req.params.id)

    res.status(Notification.status).json(Notification.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Notifications = await NotificationService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Notifications.status).json(Notifications.message)   
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  findpagination
}