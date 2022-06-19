const { Router } = require('express');
const { 
  ClientComponent, UserComponent, CostCenterComponent, NodeComponent, FactureComponent, LicenseComponent
} = require('../components');

const router = Router();

/**
* @swagger
*  /v1/pagination/clients?:
*      post:
*          summary: get clients paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/tax'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
router.post('/clients', ClientComponent.findpagination)

/**
* @swagger
*  /v1/pagination/users?:
*      post:
*          summary: get users paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/tax'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
router.post('/users', UserComponent.findpagination);

/**
* @swagger
*  /v1/pagination/costCenter?:
*      post:
*          summary: get costCenter paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/costCenterP'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
  router.post('/costCenters', CostCenterComponent.findpagination)

/**
* @swagger
*  /v1/pagination/nodes?:
*      post:
*          summary: get nodes paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/nodeP'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
router.post('/nodes', NodeComponent.findpagination)
 
/**
* @swagger
*  /v1/pagination/licenses?:
*      post:
*          summary: get licenses paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/licenseP'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
router.post('/licenses', LicenseComponent.findpagination)

/**
* @swagger
*  /v1/pagination/factures?:
*      post:
*          summary: get factures paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/factureP'
*          responses:
*              200:
*                  description: get tax succefully  
*              401:
*                  description: tax not authorized to get tax
*          parameters: [
*           {
*              name: size,
*              in: query,
*              description: size to pagination,
*              schema: {
*                  type: string
*              }
*           },
*           {
*              name: page,
*              in: query,
*              description: number of page paginate,
*              schema: {
*                  type: string
*              }
*           },
*          ]
*/
router.post('/nodes', FactureComponent.findpagination)

 /**
  * @swagger
  * tags:
  *  name: Pagination
  *  description: endpoints for managing Paginations.
  * components:
  *  schemas:
  *      clientP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: department=risaralda
  *      userP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: typeUser=USER_READ
  *      costCenterP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: debit>0
  *      nodeP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: debit>0
  *      licenseP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: type=CLIENT
  *      factureP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: state=IN_DEBT
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