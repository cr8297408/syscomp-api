const { Router } = require('express');
const { __name__Component } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/__name__s:
 *      get:
<<<<<<< HEAD
 *          summary: det all the __name__s;
=======
 *          summary: get all the __name__s;
>>>>>>> development
 *          tags: ["__name__s"]
 *          responses:
 *              200:
 *                  description: get __name__s successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/__name__s'
 *              401:
 *                  description: error in get __name__s
 */
 router.get('/', __name__Component.findAll)

 /**
  * @swagger
  *  /v1/__name__s/{id}:
  *      get:
  *          summary: get one __name__ by id
  *          tags: ["__name__s"]
  *          responses:
  *              200:
  *                  description: get __name__ succefully  
  *              401:
  *                  description: user not authorized to get __name__
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the __name__,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', __name__Component.findOne);
 
 /**
  * @swagger
  *  /v1/__name__s/{id}:
  *      delete:
  *          summary: delete a __name__
  *          tags: ["__name__s"]
  *          responses:
  *              200:
  *                  description: __name__ deleted succesfully
  *              401:
  *                  description: user not authorized to delete __name__s
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the __name__,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', __name__Component.deleteOne);
 
 /**
  * @swagger
  *  /v1/__name__s/{id}:
  *      put:
  *          summary: put __name__ in the DB
  *          tags: ["__name__s"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/__name__s'
  *          responses:
  *              200:
  *                  description: update __name__ successfully
  *              401:
  *                  description: user not authorized to update __name__s
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the __name__,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', __name__Component.updateOne);
 
 /**
  * @swagger
  *  /v1/__name__s:
  *      post:
  *          summary: added a __name__
  *          tags: ["__name__s"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/__name__s'
  *          responses:
  *              200:
  *                  description: __name__ add successfully
  *              401:
  *                  description: user not authorized to add __name__s
  */
 router.post('/', __name__Component.create)
 
 /**
  * @swagger
  * tags:
  *  name: __name__s
  *  description: endpoints for managing api __name__s.
  * components:
  *  schemas:
  *      __name__s:
  *          type: object
  *          required:
  *              -name
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