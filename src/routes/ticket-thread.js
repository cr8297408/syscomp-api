const { Router } = require('express');
const { TicketThreadComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/TicketThreads:
 *      get:
 *          summary: get all the TicketThreads;
 *          tags: ["TicketThreads"]
 *          responses:
 *              200:
 *                  description: get TicketThreads successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/TicketThreads'
 *              401:
 *                  description: error in get TicketThreads
 */
 router.get('/', TicketThreadComponent.findAll)

 /**
  * @swagger
  *  /v1/TicketThreads/{id}:
  *      get:
  *          summary: get one TicketThread by id
  *          tags: ["TicketThreads"]
  *          responses:
  *              200:
  *                  description: get TicketThread succefully  
  *              401:
  *                  description: user not authorized to get TicketThread
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TicketThread,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', TicketThreadComponent.findOne);
 
 /**
  * @swagger
  *  /v1/TicketThreads/{id}:
  *      delete:
  *          summary: delete a TicketThread
  *          tags: ["TicketThreads"]
  *          responses:
  *              200:
  *                  description: TicketThread deleted succesfully
  *              401:
  *                  description: user not authorized to delete TicketThreads
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TicketThread,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', TicketThreadComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/TicketThreads/{id}:
  *      put:
  *          summary: put TicketThread in the DB
  *          tags: ["TicketThreads"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/TicketThreads'
  *          responses:
  *              200:
  *                  description: update TicketThread successfully
  *              401:
  *                  description: user not authorized to update TicketThreads
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the TicketThread,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', TicketThreadComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/TicketThreads:
  *      post:
  *          summary: added a TicketThread
  *          tags: ["TicketThreads"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/TicketThreads'
  *          responses:
  *              200:
  *                  description: TicketThread add successfully
  *              401:
  *                  description: user not authorized to add TicketThreads
  */
 router.post('/', TicketThreadComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: TicketThreads
  *  description: endpoints for managing api TicketThreads.
  * components:
  *  schemas:
  *      TicketThreads:
  *          type: object
  *          required:
  *              -response
  *              -SupportTicketId
  *          properties:
  *              id:
  *                  type: string
  *              response:
  *                  type: string,
  *              date:
  *                  type: date,
  *              estate:
  *                  type: string,
  *              SupportTicketId:
  *                  type: string,
  *          example:
  *              response: 'respuesta para el ticket generado '
  *              date: '2022-06-23'
  *              estate: OPEN
  *              SupportTicketId: id
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