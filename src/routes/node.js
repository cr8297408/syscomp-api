const { Router } = require('express');
const { NodeComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Nodes:
 *      get:
 *          summary: get all the Nodes;
 *          tags: ["Nodes"]
 *          responses:
 *              200:
 *                  description: get Nodes successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/node'
 *              401:
 *                  description: error in get Nodes
 */
 router.get('/', NodeComponent.findAll)

 /**
  * @swagger
  *  /v1/Nodes/{id}:
  *      get:
  *          summary: get one Node by id
  *          tags: ["Nodes"]
  *          responses:
  *              200:
  *                  description: get Node succefully  
  *              401:
  *                  description: user not authorized to get Node
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Node,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', NodeComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Nodes/{id}:
  *      delete:
  *          summary: delete a Node
  *          tags: ["Nodes"]
  *          responses:
  *              200:
  *                  description: Node deleted succesfully
  *              401:
  *                  description: user not authorized to delete Nodes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Node,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', NodeComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Nodes/{id}:
  *      put:
  *          summary: put Node in the DB
  *          tags: ["Nodes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/node'
  *          responses:
  *              200:
  *                  description: update Node successfully
  *              401:
  *                  description: user not authorized to update Nodes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Node,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', NodeComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Nodes:
  *      post:
  *          summary: added a Node
  *          tags: ["Nodes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/node'
  *          responses:
  *              200:
  *                  description: Node add successfully
  *              401:
  *                  description: user not authorized to add Nodes
  */
 router.post('/', NodeComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Nodes
  *  description: endpoints for managing api Nodes.
  * components:
  *  schemas:
  *      node:
  *          type: object
  *          required:
  *              -finishDate
  *              -price
  *              -debit
  *          properties:
  *              CostCenterId
  *              serial
  *              initDate
  *              finishDate
  *              price
  *              debit
  *              isLifetime
  *              isActive
  *          example:
  *              CostCenterId: idcost
  *              initDate: "2022-06-13"
  *              finishDate: "2023-06-13"
  *              price: 300000
  *              debit: 300000
  *              isLifetime: false
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