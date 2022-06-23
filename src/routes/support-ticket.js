const { Router } = require('express');
const { SupportTicketComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/SupportTickets:
 *      get:
 *          summary: get all the SupportTickets;
 *          tags: ["SupportTickets"]
 *          responses:
 *              200:
 *                  description: get SupportTickets successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/SupportTickets'
 *              401:
 *                  description: error in get SupportTickets
 */
 router.get('/', SupportTicketComponent.findAll)

 /**
  * @swagger
  *  /v1/SupportTickets/{id}:
  *      get:
  *          summary: get one SupportTicket by id
  *          tags: ["SupportTickets"]
  *          responses:
  *              200:
  *                  description: get SupportTicket succefully  
  *              401:
  *                  description: user not authorized to get SupportTicket
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the SupportTicket,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', SupportTicketComponent.findOne);
 
 /**
  * @swagger
  *  /v1/SupportTickets/{id}:
  *      delete:
  *          summary: delete a SupportTicket
  *          tags: ["SupportTickets"]
  *          responses:
  *              200:
  *                  description: SupportTicket deleted succesfully
  *              401:
  *                  description: user not authorized to delete SupportTickets
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the SupportTicket,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', SupportTicketComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/SupportTickets/{id}:
  *      put:
  *          summary: put SupportTicket in the DB
  *          tags: ["SupportTickets"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/SupportTickets'
  *          responses:
  *              200:
  *                  description: update SupportTicket successfully
  *              401:
  *                  description: user not authorized to update SupportTickets
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the SupportTicket,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', SupportTicketComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/SupportTickets:
  *      post:
  *          summary: added a SupportTicket
  *          tags: ["SupportTickets"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/SupportTickets'
  *          responses:
  *              200:
  *                  description: SupportTicket add successfully
  *              401:
  *                  description: user not authorized to add SupportTickets
  */
 router.post('/', SupportTicketComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: SupportTickets
  *  description: endpoints for managing api SupportTickets.
  * components:
  *  schemas:
  *      SupportTickets:
  *          type: object
  *          required:
  *              -name
  *              -title
  *              -subject
  *              -user
  *              -reason
  *              -TypeTicketId
  *          properties:
  *              id:
  *                  type: string
  *              title:
  *                  type: string
  *              subject:
  *                  type: string
  *              UserId:
  *                  type: string
  *              reason:
  *                  type: string
  *              estate:
  *                  type: string
  *              priority:
  *                  type: string
  *              TypeTicketId:
  *                  type: string
  *          example:
  *              title: inicio seccion
  *              subject: no da acceso 
  *              UserId: iduser
  *              reason: en el apartado de logueo, mis credenciales no sirven
  *              estate: PENDING
  *              priority: HIGH
  *              TypeTicketId: idticketreport
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