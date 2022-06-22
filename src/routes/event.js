const { Router } = require('express');
const { EventComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Events:
 *      get:
 *          summary: get all the Events;
 *          tags: ["Events"]
 *          responses:
 *              200:
 *                  description: get Events successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Events'
 *              401:
 *                  description: error in get Events
 */
 router.get('/', EventComponent.findAll)

 /**
  * @swagger
  *  /v1/Events/{id}:
  *      get:
  *          summary: get one Event by id
  *          tags: ["Events"]
  *          responses:
  *              200:
  *                  description: get Event succefully  
  *              401:
  *                  description: user not authorized to get Event
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Event,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', EventComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Events/showParticipants/{EventId}:
  *      get:
  *          summary: get users by id
  *          tags: ["Events"]
  *          responses:
  *              200:
  *                  description: get users succefully  
  *              401:
  *                  description: user not authorized to get users
  *          parameters: [
  *           {
  *              name: EventId,
  *              in: path,
  *              description: id of the Event,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
  router.get('/showParticipants/:EventId', EventComponent.showParticipants);

 /**
  * @swagger
  *  /v1/Events/{id}:
  *      delete:
  *          summary: delete a Event
  *          tags: ["Events"]
  *          responses:
  *              200:
  *                  description: Event deleted succesfully
  *              401:
  *                  description: user not authorized to delete Events
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Event,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', EventComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Events/{id}:
  *      put:
  *          summary: put Event in the DB
  *          tags: ["Events"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Events'
  *          responses:
  *              200:
  *                  description: update Event successfully
  *              401:
  *                  description: user not authorized to update Events
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Event,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', EventComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Events:
  *      post:
  *          summary: added a Event
  *          tags: ["Events"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Events'
  *          responses:
  *              200:
  *                  description: Event add successfully
  *              401:
  *                  description: user not authorized to add Events
  */
 router.post('/', EventComponent.create)

 /**
  * @swagger
  *  /v1/Events/asociate:
  *      post:
  *          summary: added Events to users 
  *          tags: ["Events"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/EventsUsers'
  *          responses:
  *              200:
  *                  description: Events add successfully
  *              401:
  *                  description: user not authorized to add Events
  */
  router.post('/asociate', EventComponent.grantEvents)
 
 /**
  * @swagger
  * tags:
  *  name: Events
  *  description: endpoints for managing api Events.
  * components:
  *  schemas:
  *      Events:
  *          type: object
  *          required:
  *              -subtitle
  *              -title
  *              -finishDate
  *              -initDate
  *              -estate
  *          properties:
  *              id:
  *                  type: string
  *              icon:
  *                  type: string
  *              subtitle:
  *                  type: string
  *              title: 
  *                  type: string
  *              finishDate:
  *                  type: date
  *              initDate:
  *                  type: date
  *              description:
  *                  type: string
  *              estate:
  *                  type: string   
  *          example:
  *              icon: link_to_bucket
  *              title: daily
  *              subtitle: daily no 105
  *              initDate: 2022-06-22
  *              finishDate: 2022-06-22
  *              description: reunion para revisar dia anterior
  *              estate: ACTIVE
  *      EventsUsers:
  *          type: object
  *          required:
  *              -users
  *              -events
  *          properties:
  *              users:
  *                  type: array
  *                  items:
  *                      type: string
  *              events:
  *                  type: array
  *                  items:
  *                      type: string 
  *          example:
  *              users: ['userjkkjj1', 'userjkkjj2', 'userjkkjj13']
  *              events: ['idEvent1', 'addmoreid']
  *      Error:    
  *          type: object
  *          required:
  *              -status
  *              -message
  *          properties:
  *              status: 
  *                  type: integer
  *                  description: HTTP status code
  *                  example: 400
  *              message:
  *                  type: string
  *                  description: Error description
  *                  example: entity no created
  */
 
 module.exports = router;