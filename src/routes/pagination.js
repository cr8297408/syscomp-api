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
  ReportTypeComponent,
  FileComponent,
  NotificationComponent,
  SupportTicketComponent,
  TicketThreadComponent
} = require('../components');

const router = Router();

/**
* @swagger
*  /v1/pagination/ticketThreads?:
*      post:
*          summary: get ticketThreads paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get ticketThreads succefully  
*              401:
*                  description: ticketThreads not authorized to get ticketThreads
*/
router.post('/ticketThreads', TicketThreadComponent.findpagination)

/**
* @swagger
*  /v1/pagination/supportTickets?:
*      post:
*          summary: get supportTickets paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get supportTickets succefully  
*              401:
*                  description: supportTickets not authorized to get supportTickets
*/
router.post('/supportTickets', SupportTicketComponent.findpagination)

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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get clients succefully  
*              401:
*                  description: clients not authorized to get clients
*/
router.post('/clients', ClientComponent.findpagination)

/**
* @swagger
*  /v1/pagination/notifications?:
*      post:
*          summary: get notifications paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get notifications succefully  
*              401:
*                  description: notifications not authorized to get notifications
*/
router.post('/notifications', NotificationComponent.findpagination)

/**
* @swagger
*  /v1/pagination/files?:
*      post:
*          summary: get files paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get files succefully  
*              401:
*                  description: files not authorized to get files
*/
router.post('/files', FileComponent.findpagination)

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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get users succefully  
*              401:
*                  description: users not authorized to get users
*/
router.post('/users', UserComponent.findpagination);

/**
* @swagger
*  /v1/pagination/costCenters?:
*      post:
*          summary: get costCenter paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get cost centers succefully  
*              401:
*                  description: cost centers not authorized to get cost centers
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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get nodes succefully  
*              401:
*                  description: nodes not authorized to get nodes
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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get license succefully  
*              401:
*                  description: license not authorized to get license
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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get factures succefully  
*              401:
*                  description: factures not authorized to get factures
*/
router.post('/factures', FactureComponent.findpagination);

/**
* @swagger
*  /v1/pagination/payments?:
*      post:
*          summary: get paymentss paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get payments succefully  
*              401:
*                  description: payments not authorized to get payments
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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get items succefully  
*              401:
*                  description: items not authorized to get items
*/
router.post('/items', ItemComponent.findpagination)

/**
* @swagger
*  /v1/pagination/reportTypes?:
*      post:
*          summary: get reportTypes paginated
*          tags: ["Pagination"]
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get reportTypes succefully  
*              401:
*                  description: reportTypes not authorized to get reportTypes
*/
router.post('/reportTypes', ReportTypeComponent.findpagination)


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
*                          $ref: '#/components/schemas/pagination'
*          responses:
*              200:
*                  description: get event succefully  
*              401:
*                  description: event not authorized to get event
*/
router.post('/events', EventComponent.findpagination)

 /**
  * @swagger
  * tags:
  *  name: Pagination
  *  description: endpoints for managing Paginations.
  * components:
  *  schemas:
  *      pagination:
  *          type: string
  *          required:
  *              -where
  *          example:
  *              where: c
  *              isActive: false
  *              size: 8
  *              page: 1
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