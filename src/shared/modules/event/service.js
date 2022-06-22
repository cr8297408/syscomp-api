const db = require('../../../config/connection/connectBd');
const EventValidation = require('./validation');
const Event = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const EventUser = require('./eventsUser.model');
const User = require('../user/model');

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Events = await Event.findAll()
        return Events;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Event} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = EventValidation.createEvent(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createEvent = await Event.create(body);
        return createEvent;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Event} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = EventValidation.getEvent(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getEvent = await Event.findByPk(id)
        return getEvent;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Event} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await EventValidation.getEvent(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getEvent = await Event.findByPk(id);
        
        await getEvent.destroy()

        return getEvent;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await EventValidation.getEvent(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await EventValidation.createEvent(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newEvent = await Event.update(
          {
            icon: body.icon,
            subtitle: body.subtitle,
            title: body.title,
            finishDate: body.finishDate,
            initDate: body.initDate,
            description: body.description,
            estate: body.estate  
          },
          {where: {id}}
        )
  
        return newEvent;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const Events = await Pagination('Events',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Events
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
        throw new Error(error.message);
    }
  },

  async grantEvents(bearerHeader, users, events){
    try {
      const validateBody = await EventValidation.grantEvent({users, events})
      if (validateBody.error) {
        throw new Error(validateBody.error)
      }
      const validatePermission = await permissions(bearerHeader, 'CREATE')
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
          return {
            message: 'eventos otorgados correctamente',
            status: 200 
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }

      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async showParticipants(bearerHeader, EventId){
    try {
      const validatePermissions = await permissions(bearerHeader, 'FIND_ALL');
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

        return participants;

      }

      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

module.exports = EventService;