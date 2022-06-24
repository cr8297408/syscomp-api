const { Router } = require('express');
const { PaymentComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Payments:
 *      get:
 *          summary: get all the Payments;
 *          tags: ["Payments"]
 *          responses:
 *              200:
 *                  description: get Payments successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Payments'
 *              401:
 *                  description: error in get Payments
 */
 router.get('/', PaymentComponent.findAll)

 /**
  * @swagger
  *  /v1/Payments/{id}:
  *      get:
  *          summary: get one Payment by id
  *          tags: ["Payments"]
  *          responses:
  *              200:
  *                  description: get Payment succefully  
  *              401:
  *                  description: user not authorized to get Payment
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Payment,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', PaymentComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Payments/{id}:
  *      delete:
  *          summary: delete a Payment
  *          tags: ["Payments"]
  *          responses:
  *              200:
  *                  description: Payment deleted succesfully
  *              401:
  *                  description: user not authorized to delete Payments
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Payment,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', PaymentComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Payments/{id}:
  *      put:
  *          summary: put Payment in the DB
  *          tags: ["Payments"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Payments'
  *          responses:
  *              200:
  *                  description: update Payment successfully
  *              401:
  *                  description: user not authorized to update Payments
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Payment,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', PaymentComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Payments:
  *      post:
  *          summary: added a Payment
  *          tags: ["Payments"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Payments'
  *          responses:
  *              200:
  *                  description: Payment add successfully
  *              401:
  *                  description: user not authorized to add Payments
  */
 router.post('/', PaymentComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Payments
  *  description: endpoints for managing api Payments.
  * components:
  *  schemas:
  *      Payments:
  *          type: object
  *          required:
  *             -FactureId
  *             -amount
  *             -date
  *             -checked
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *          example:
  *              name: unit prueba
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