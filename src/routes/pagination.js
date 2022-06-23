const { Router } = require('express');
const { 
  ClientComponent, 
  UserComponent, 
  CostCenterComponent, 
  NodeComponent, 
  FactureComponent, 
  LicenseComponent, 
  PaymentComponent,
  ItemComponent,
  EventComponent,
  ReportTypeComponent
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
*                          $ref: '#/components/schemas/clientP'
*          responses:
*              200:
*                  description: get clients succefully  
*              401:
*                  description: clients not authorized to get clients
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
*                          $ref: '#/components/schemas/userp'
*          responses:
*              200:
*                  description: get users succefully  
*              401:
*                  description: users not authorized to get users
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
*                  description: get cost centers succefully  
*              401:
*                  description: cost centers not authorized to get cost centers
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
*                  description: get nodes succefully  
*              401:
*                  description: nodes not authorized to get nodes
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
*                  description: get license succefully  
*              401:
*                  description: license not authorized to get license
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
*                          $ref: '#/components/schemas/facturesP'
*          responses:
*              200:
*                  description: get factures succefully  
*              401:
*                  description: factures not authorized to get factures
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
router.post('/nodes', FactureComponent.findpagination);

/**
* @swagger
*  /v1/pagination/paymentss?:
*      post:
*          summary: get paymentss paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/paymentsP'
*          responses:
*              200:
*                  description: get payments succefully  
*              401:
*                  description: payments not authorized to get payments
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
router.post('/payments', PaymentComponent.findpagination)

/**
* @swagger
*  /v1/pagination/items?:
*      post:
*          summary: get items paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/itemsP'
*          responses:
*              200:
*                  description: get items succefully  
*              401:
*                  description: items not authorized to get items
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
router.post('/items', ItemComponent.findpagination)

/**
* @swagger
*  /v1/pagination/reportTypes?:
*      get:
*          summary: get reportTypes paginated
*          tags: ["Pagination"]
*          responses:
*              200:
*                  description: get reportTypes succefully  
*              401:
*                  description: reportTypes not authorized to get reportTypes
*/
router.get('/reportTypes', ReportTypeComponent.findpagination)


/**
* @swagger
*  /v1/pagination/events?:
*      post:
*          summary: get events paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/eventsP'
*          responses:
*              200:
*                  description: get event succefully  
*              401:
*                  description: event not authorized to get event
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
router.post('/events', EventComponent.findpagination)

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
  *      facturesP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: state=IN_DEBT
  *      paymentsP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: checked=false
  *      itemsP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: FactureId=idfactura
  *      eventsP:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: state=ACTIVE
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