const { Router } = require('express');
const { CostCenterComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/CostCenters:
 *      get:
 *          summary: get all the CostCenters;
 *          tags: ["CostCenters"]
 *          responses:
 *              200:
 *                  description: get CostCenters successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/CostCenters'
 *              401:
 *                  description: error in get CostCenters
 */
 router.get('/', CostCenterComponent.findAll)

 /**
  * @swagger
  *  /v1/CostCenters/{id}:
  *      get:
  *          summary: get one CostCenter by id
  *          tags: ["CostCenters"]
  *          responses:
  *              200:
  *                  description: get CostCenter succefully  
  *              401:
  *                  description: user not authorized to get CostCenter
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the CostCenter,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', CostCenterComponent.findOne);
 
 /**
  * @swagger
  *  /v1/CostCenters/{id}:
  *      delete:
  *          summary: delete a CostCenter
  *          tags: ["CostCenters"]
  *          responses:
  *              200:
  *                  description: CostCenter deleted succesfully
  *              401:
  *                  description: user not authorized to delete CostCenters
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the CostCenter,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', CostCenterComponent.deleteOne);

   /**
  * @swagger
  *  /v1/costCenters/activate/{id}:
  *      put:
  *          summary: activate a user
  *          tags: ["users"]
  *          responses:
  *              200:
  *                  description: user activated succesfully
  *              401:
  *                  description: user not authorized to activate users
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the user,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
  router.put('/activate/:id', CostCenterComponent.activateCostCenter);
 
 /**
  * @swagger
  *  /v1/CostCenters/{id}:
  *      put:
  *          summary: put CostCenter in the DB
  *          tags: ["CostCenters"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/CostCenters'
  *          responses:
  *              200:
  *                  description: update CostCenter successfully
  *              401:
  *                  description: user not authorized to update CostCenters
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the CostCenter,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', CostCenterComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/CostCenters:
  *      post:
  *          summary: para agregar un centro de costo, primero debes crear un cliente y con ese cliente una licensia, el id de dicha licensia se usará para crear el centro de costo
  *          tags: ["CostCenters"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/CostCenters'
  *          responses:
  *              200:
  *                  description: CostCenter add successfully
  *              401:
  *                  description: user not authorized to add CostCenters
  */
 router.post('/', CostCenterComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: CostCenters
  *  description: endpoints for managing api CostCenters.
  * components:
  *  schemas:
  *      CostCenters:
  *          type: object
  *          required:
  *              -name
  *              -finishDate
  *              -price
  *              -debit
  *              -direction
  *              -LicenseId
  *          properties:
  *              serial
  *              LicenseId
  *              name
  *              initDate
  *              finishDate
  *              price
  *              direction
  *              nodes
  *              isLifetime
  *              isActive
  *          example:
  *              name: pereira center
  *              LicenseId: idlicense
  *              finishDate: "2023-06-18"
  *              direction: 'cr8 #14-b'
  *              price: 300000
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