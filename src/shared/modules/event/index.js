const EventService = require('./service');


async function findAll(req, res, next) {
  try {
    const Events = await EventService.findAll(req.headers['authorization'])
    res.status(200).json(Events)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getEvent = await EventService.create(req.headers['authorization'],req.body);
    res.status(201).json(getEvent)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getEvent = await EventService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getEvent)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Event = await EventService.delete(req.headers['authorization'],req.params.id)

    res.json(Event)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Event = await EventService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Event)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Events = await EventService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Events)    
  } catch (error) {
      res.json(error.message)
  }
}

async function grantEvents(req, res){
  try {
    const {users, events} = req.body;
    const eventsUsers = await EventService.grantEvents(req.headers['authorization'], users, events)

    res.json(eventsUsers);
  } catch(error){
    res.json(error.message)
  }
}

async function showParticipants(req, res){
  try {

    const { EventId } = req.params;
    
    const users = await EventService.showParticipants(req.headers['authorization'], EventId);

    res.json(users)
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