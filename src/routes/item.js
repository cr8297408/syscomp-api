const { Router } = require('express');
const { ItemComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Items:
 *      get:
 *          summary: get all the Items;
 *          tags: ["Items"]
 *          responses:
 *              200:
 *                  description: get Items successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Items'
 *              401:
 *                  description: error in get Items
 */
 router.get('/', ItemComponent.findAll)

 /**
  * @swagger
  *  /v1/Items/{id}:
  *      get:
  *          summary: get one Item by id
  *          tags: ["Items"]
  *          responses:
  *              200:
  *                  description: get Item succefully  
  *              401:
  *                  description: user not authorized to get Item
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Item,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ItemComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Items/{id}:
  *      delete:
  *          summary: delete a Item
  *          tags: ["Items"]
  *          responses:
  *              200:
  *                  description: Item deleted succesfully
  *              401:
  *                  description: user not authorized to delete Items
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Item,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ItemComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Items/{id}:
  *      put:
  *          summary: put Item in the DB
  *          tags: ["Items"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Items'
  *          responses:
  *              200:
  *                  description: update Item successfully
  *              401:
  *                  description: user not authorized to update Items
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Item,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ItemComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Items:
  *      post:
  *          summary: added a Item
  *          tags: ["Items"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Items'
  *          responses:
  *              200:
  *                  description: Item add successfully
  *              401:
  *                  description: user not authorized to add Items
  */
 router.post('/', ItemComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Items
  *  description: endpoints for managing api Items.
  * components:
  *  schemas:
  *      Items:
  *          type: object
  *          required:
  *              -FactureId
  *              -sum
  *              -amount
  *              -description
  *          properties:
  *              id:
  *                  type: string
  *              sum:
  *                  type: number,
  *              amount:
  *                  type: number,
  *              description:
  *                  type: string,
  *              FactureId:
  *                  type: string,
  *          example:
  *              sum: 3
  *              amount: 1000000
  *              description: dos nodos de 500 en un centro de costo
  *              FactureId: idFactura
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