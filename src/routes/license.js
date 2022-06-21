const { Router } = require('express');
const { LicenseComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Licenses:
 *      get:
 *          summary: get all the Licenses;
 *          tags: ["Licenses"]
 *          responses:
 *              200:
 *                  description: get Licenses successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Licenses'
 *              401:
 *                  description: error in get Licenses
 */
 router.get('/', LicenseComponent.findAll)

 /**
  * @swagger
  *  /v1/Licenses/{id}:
  *      get:
  *          summary: get one License by id
  *          tags: ["Licenses"]
  *          responses:
  *              200:
  *                  description: get License succefully  
  *              401:
  *                  description: user not authorized to get License
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the License,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', LicenseComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Licenses/{id}:
  *      delete:
  *          summary: delete a License
  *          tags: ["Licenses"]
  *          responses:
  *              200:
  *                  description: License deleted succesfully
  *              401:
  *                  description: user not authorized to delete Licenses
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the License,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', LicenseComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Licenses/{id}:
  *      put:
  *          summary: put License in the DB
  *          tags: ["Licenses"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Licenses'
  *          responses:
  *              200:
  *                  description: update License successfully
  *              401:
  *                  description: user not authorized to update Licenses
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the License,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', LicenseComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Licenses:
  *      post:
  *          summary: added a License
  *          tags: ["Licenses"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Licenses'
  *          responses:
  *              200:
  *                  description: License add successfully
  *              401:
  *                  description: user not authorized to add Licenses
  */
 router.post('/', LicenseComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Licenses
  *  description: endpoints for managing api Licenses.
  * components:
  *  schemas:
  *      Licenses:
  *          type: object
  *          required:
  *              -expired_date
  *              -ClientId
  *          properties:
  *              serial:
  *                 type: string
  *              type: 
  *                 type: string
  *              description:
  *                 type: string
  *              ClientId:
  *                 type: string
  *              start_date:
  *                 type: date
  *              expired_date:
  *                 type: date
  *              isActive:
  *                 type: boolea
  *              isLifetime:
  *                 type: boolea
  *          example:
  *              type: CLIENT
  *              ClientId: idcliente
  *              description: licencia prueba
  *              start_date: "2022-06-15"
  *              expired_date: "2024-05-29"
  *              price: 300000
  *              isActive: false
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