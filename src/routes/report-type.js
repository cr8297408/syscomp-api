const { Router } = require('express');
const { ReportTypeComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/ReportTypes:
 *      get:
 *          summary: get all the ReportTypes;
 *          tags: ["ReportTypes"]
 *          responses:
 *              200:
 *                  description: get ReportTypes successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ReportTypes'
 *              401:
 *                  description: error in get ReportTypes
 */
 router.get('/', ReportTypeComponent.findAll)

 /**
  * @swagger
  *  /v1/ReportTypes/{id}:
  *      get:
  *          summary: get one ReportType by id
  *          tags: ["ReportTypes"]
  *          responses:
  *              200:
  *                  description: get ReportType succefully  
  *              401:
  *                  description: user not authorized to get ReportType
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ReportType,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', ReportTypeComponent.findOne);
 
 /**
  * @swagger
  *  /v1/ReportTypes/{id}:
  *      delete:
  *          summary: delete a ReportType
  *          tags: ["ReportTypes"]
  *          responses:
  *              200:
  *                  description: ReportType deleted succesfully
  *              401:
  *                  description: user not authorized to delete ReportTypes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ReportType,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', ReportTypeComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/ReportTypes/{id}:
  *      put:
  *          summary: put ReportType in the DB
  *          tags: ["ReportTypes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/ReportTypes'
  *          responses:
  *              200:
  *                  description: update ReportType successfully
  *              401:
  *                  description: user not authorized to update ReportTypes
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the ReportType,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', ReportTypeComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/ReportTypes:
  *      post:
  *          summary: added a ReportType
  *          tags: ["ReportTypes"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/ReportTypes'
  *          responses:
  *              200:
  *                  description: ReportType add successfully
  *              401:
  *                  description: user not authorized to add ReportTypes
  */
 router.post('/', ReportTypeComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: ReportTypes
  *  description: endpoints for managing api ReportTypes.
  * components:
  *  schemas:
  *      ReportTypes:
  *          type: object
  *          required:
  *              -name
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string,
  *              description:
  *                  type: string,
  *          example:
  *              name: preguntas
  *              description: ticket para preguntas
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