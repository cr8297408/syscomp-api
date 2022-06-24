const { Router } = require('express');
const { FactureComponent } = require('../components');

const router = Router();

/**
 * @swagger
 *  /v1/Factures:
 *      get:
 *          summary: get all the Factures;
 *          tags: ["Factures"]
 *          responses:
 *              200:
 *                  description: get Factures successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Factures'
 *              401:
 *                  description: error in get Factures
 */
 router.get('/', FactureComponent.findAll)

 /**
  * @swagger
  *  /v1/Factures/{id}:
  *      get:
  *          summary: get one Facture by id
  *          tags: ["Factures"]
  *          responses:
  *              200:
  *                  description: get Facture succefully  
  *              401:
  *                  description: user not authorized to get Facture
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Facture,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', FactureComponent.findOne);
 
 /**
  * @swagger
  *  /v1/Factures/{id}:
  *      delete:
  *          summary: delete a Facture
  *          tags: ["Factures"]
  *          responses:
  *              200:
  *                  description: Facture deleted succesfully
  *              401:
  *                  description: user not authorized to delete Factures
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Facture,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 router.delete('/:id', FactureComponent.deleteOne);
 
 /**
  * @swagger
  *  /v1/Factures/{id}:
  *      put:
  *          summary: put Facture in the DB
  *          tags: ["Factures"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/Factures'
  *          responses:
  *              200:
  *                  description: update Facture successfully
  *              401:
  *                  description: user not authorized to update Factures
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the Facture,
  *              required: true,
  *              schema: {
  *                  type: string,
  *              }
  *           },
  *          ]
  */
 
 router.put('/:id', FactureComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/Factures:
  *      post:
  *          summary: added a Facture
  *          tags: ["Factures"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Factures'
  *          responses:
  *              200:
  *                  description: Facture add successfully
  *              401:
  *                  description: user not authorized to add Factures
  */
 router.post('/', FactureComponent.create)
 
 /**
  * @swagger
  * tags:
  *  name: Factures
  *  description: endpoints for managing api Factures.
  * components:
  *  schemas:
  *      Factures:
  *          type: object
  *          required:
  *              -ClientId
  *              -LicenseId
  *              -UserId
  *              -amount
  *              -limitDate
  *              -rememberDate
  *          properties:
  *              ClientId:
  *                 type: string
  *              LicenseId:
  *                 type: string
  *              UserId:
  *                 type: string
  *              observation:
  *                 type: text
  *              amount:
  *                 type: number
  *              limitDate:
  *                 type: date
  *              rememberDate:
  *                 type: date
  *              paidOut:
  *                 type: boolean
  *              estate:
  *                 type: string
  *          example:
  *              ClientId: id cliente
  *              LicenseId: id licencia
  *              UserId: id usuario
  *              observation: licencia para cliente restautante paris
  *              amount: 600000
  *              limitDate: "2022-07-17"
  *              rememberDate: "2022-06-25"
  *              paidOut: false
  *              estate: IN_DEBT
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