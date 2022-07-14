const db = require('../../../config/connection/connectBd');
const EventValidation = require('./validation');
const Event = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const EventUser = require('./eventsUser.model');
const User = require('../user/model');
const HttpResponse = require('../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Event} model
 */
const EventService = {
  /**
   * @exports
   * @implements {Event} model
   * @description get all Events 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_EVENT']);
      if (validatePermission) {
        const Events = await Event.findAll()
        return new HttpResponse(200, Events);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Event} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_EVENT'])
      if (validatePermission) {
        const validate = EventValidation.createEvent(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
  
        const user = await getUser(bearerHeader);
        const createEvent = await Event.create({
          icon: body.icon,
          subtitle: body.subtitle,
          title: body.title,
          finishDate: body.finishDate,
          initDate: body.initDate,
          description: body.description,
          estate: body.estate,
          createdBy: user.id
        });

        return new HttpResponse(201, 'evento creado');
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Event} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_EVENT'])
      if (validatePermission) {
        const validate = EventValidation.getEvent(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getEvent = await Event.findByPk(id)
        return new HttpResponse(200, getEvent);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Event} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_EVENT'])
      if (validatePermission) {
        const validate = await EventValidation.getEvent(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const getEvent = await Event.findByPk(id);
        
        await getEvent.destroy()

        return new HttpResponse(200, 'evento eliminado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Event in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_EVENT'])
      if (validatePermission) {
        
        const validateid = await EventValidation.getEvent(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validate.error);
        }
        
        const user = await getUser(bearerHeader);
        
        const newEvent = await Event.update(
          {
            icon: body.icon,
            subtitle: body.subtitle,
            title: body.title,
            finishDate: body.finishDate,
            initDate: body.initDate,
            description: body.description,
            estate: body.estate,
            updatedBy: user.id,
            isActive: body.isActive
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'evento actualizado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      if(isActive == undefined || typeof(isActive) !== 'boolean'){
        isActive = true
      }
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_EVENT'])
      if (validatePermission) {
        let query = `SELECT * FROM events WHERE title LIKE '%${wherecond}%' AND isActive = ${isActive} OR subtitle LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const Events = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, Events);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async grantEvents(bearerHeader, users, events){
    try {
      const validateBody = await EventValidation.grantEvent({users, events})
      if (validateBody.error) {
        throw new Error(validateBody.error)
      }
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_EVENT'])
      if (validatePermission) {
        try {
          console.log(events.length, users.length);
          for (let i = 0; i < events.length; i++) {
            for (let j = 0; j < users.length; j++) {
              const eventu = await EventUser.create({
                UserId: users[j],
                EventId: events[i]
              })
            }  
          }
          return new HttpResponse(200, 'eventos otorgados correctamente');
        } catch (error) {
          return new HttpResponse(400, error.message);
        }
      }

      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async showParticipants(bearerHeader, EventId){
    try {
      const validatePermissions = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_EVENT']);
      if(validatePermissions){
         
        const usersR = await EventUser.findAll({
          where: {EventId}
        })
        
        let participants = []

        for (let i = 0; i < usersR.length; i++) {       
          const id = usersR[i].dataValues.UserId;
          const user = await User.findByPk(id);
          participants.push(user);
        }

        return new HttpResponse(200, participants);

      }

      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      return new HttpResponse(200, error.message);
    }
  }

}

module.exports = EventService;