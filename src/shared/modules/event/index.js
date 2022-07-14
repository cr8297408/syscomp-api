const EventService = require('./service');


async function findAll(req, res, next) {
  try {
    const Events = await EventService.findAll(req.headers['authorization'])
    res.status(Events.status).json(Events.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getEvent = await EventService.create(req.headers['authorization'],req.body);
    res.status(getEvent.status).json(getEvent.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getEvent = await EventService.findOne(req.headers['authorization'],req.params.id)
    res.status(getEvent.status).json(getEvent.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Event = await EventService.delete(req.headers['authorization'],req.params.id)

    res.status(Event.status).json(Event.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Event = await EventService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Event.status).json(Event.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Events = await EventService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Events.status).json(Events.message)    
  } catch (error) {
      res.json(error.message)
  }
}

async function grantEvents(req, res){
  try {
    const {users, events} = req.body;
    const eventsUsers = await EventService.grantEvents(req.headers['authorization'], users, events)

    res.status(eventsUsers.status).json(eventsUsers.message)
  } catch(error){
    res.json(error.message)
  }
}

async function showParticipants(req, res){
  try {

    const { EventId } = req.params;
    
    const users = await EventService.showParticipants(req.headers['authorization'], EventId);

    res.status(users.status).json(users.message)
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
  grantEvents,
  showParticipants
}