const { Router } = require('express');
const { ClientComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/clients:
 *      get:
 *          summary: get all the Clients;
 *          tags: ["Clients"]
 *          responses:
 *              200:
 *                  description: get Clients successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Clients'
 *              401:
 *                  description: error in get Clients
 */
 router.get('/', ClientComponent.findAll)

 /**
  * @swagger
  *  /v1/Clients/{id}:
  *      get:
  *          summary: get one Client by id
  *          tags: ["Clients"]
  *          responses:
  *              200:
  *                  description: get Client succefully  
  *              401:
  *                  description: user not authorized to get Client
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Client,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ClientComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Clients/{id}:
  *      delete:
  *          summary: delete a Client
  *          tags: ["Clients"]
  *          responses:
  *              200:
  *                  description: Client deleted succesfully
  *              401:
  *                  description: user not authorized to delete Clients
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Client,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ClientComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Clients/{id}:
  *      put:
  *          summary: put Client in the DB
  *          tags: ["Clients"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Clients'
  *          responses:
  *              200:
  *                  description: update Client successfully
  *              401:
  *                  description: user not authorized to update Clients
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Client,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ClientComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Clients:
  *      post:
  *          summary: added a Client
  *          tags: ["Clients"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Clients'
  *          responses:
  *              200:
  *                  description: Client add successfully
  *              401:
  *                  description: user not authorized to add Clients
  */
 router.post('/', ClientComponent.create)


 /**
  * @swagger
  * tags:
  *  name: Clients
  *  description: endpoints for managing api Clients.
  * components:
  *  schemas:
  *      Clients:
  *          type: object
  *          required:
  *              -businessName
  *              -nit
  *              -repLegalContact
  *              -phoneNumber
  *              -direction
  *              -municipality
  *              -department
  *              -country
  *              -email
  *              -contactDate
  *          properties:
  *              id:
  *                  type: string
  *              businessName:
  *                  type: string,
  *              nit:
  *                  type: string,
  *              repLegalContact:
  *                  type: string,
  *              phoneNumber:
  *                  type: string,
  *              direction:
  *                  type: string,
  *              municipality:
  *                  type: string,
  *              department:
  *                  type: string,
  *              country:
  *                  type: string,
  *              email:
  *                  type: string,
  *              contactDate:
  *                  type: date,
  *          example:
  *              businessName: business1
  *              nit: bussinessnit1
  *              repLegalContact: "3333333"
  *              phoneNumber: "3123456789"
  *              direction: direccion negocio1
  *              municipality: dosquebradas
  *              department: risaralda
  *              country: colombia
  *              email: emailbusiness1@mail.com
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