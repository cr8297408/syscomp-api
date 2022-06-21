const { Router } = require('express');
const { UserComponent } = require('../components');
const upload = require('../config/multer');



const router = Router();


/**
 * @swagger
 *  /v1/users:
 *      get:
 *          summary: get all the users;
 *          tags: ["users"]
 *          responses:
 *              200:
 *                  description: get users successfully 
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/users'
 *              401:
 *                  description: error in get users
 */
 router.get('/', UserComponent.findAll)

 /**
  * @swagger
  *  /v1/users/{id}:
  *      get:
  *          summary: get one user by id
  *          tags: ["users"]
  *          responses:
  *              200:
  *                  description: get user succefully  
  *              401:
  *                  description: user not authorized to get user
  *          parameters: [
  *           {
  *              name: id,
  *              in: path,
  *              description: id of the user,
  *              required: true,
  *              schema: {
  *                  type: string
  *              }
  *           },
  *          ]
  */
 
 router.get('/:id', UserComponent.findOne);

 /**
  * @swagger
  *  /v1/users/{id}:
  *      delete:
  *          summary: delete a user
  *          tags: ["users"]
  *          responses:
  *              200:
  *                  description: user deleted succesfully
  *              401:
  *                  description: user not authorized to delete users
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
 router.delete('/:id', UserComponent.deleteOne);

  /**
  * @swagger
  *  /v1/users/activate/{id}:
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
   router.put('/activate/:id', UserComponent.activateUser);
 
 /**
  * @swagger
  *  /v1/users/{id}:
  *      put:
  *          summary: put user in the DB
  *          tags: ["users"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                           $ref: '#/components/schemas/users'
  *          responses:
  *              200:
  *                  description: update user successfully
  *              401:
  *                  description: user not authorized to update users
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
 
 router.put('/:id', UserComponent.updateOne);
 
 /**
  * @swagger
  *  /v1/users:
  *      post:
  *          summary: added a user
  *          tags: ["users"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/users'
  *          responses:
  *              200:
  *                  description: user add successfully
  *              401:
  *                  descripion: user not authorized to add users
  */
 router.post('/', UserComponent.create)

 /**
  * @swagger
  *  /v1/users/putAvatar:
  *      post:
  *          summary: put avatar
  *          tags: ["users"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/putAvatarS'
  *          responses:
  *              200:
  *                  description: user add successfully
  *              401:
  *                  descripion: user not authorized to add users
  */
  router.post('/putAvatar', upload.single('avatarFile') ,UserComponent.putAvatar);

 /**
  * @swagger
  * tags:
  *  name: users
  *  description: endpoints for managing api users.
  * components:
  *  schemas:
  *      users:
  *          type: object
  *          required:
  *              -name
  *              -accountingAccount
  *          properties:
  *              id:
  *                  type: string
  *              username:
  *                  type: string,
  *              password:
  *                    type: string
  *              email:
  *                    type: string
  *              firstName:
  *                    type: string
  *              lastName:
  *                    type: string
  *              roles: 
  *                    type: json
  *              profile:
  *                    type: json
  *              avatarFile:
  *                     type: string
  *          example:
  *              username: userPrueba1
  *              password: pass123
  *              email: email1@test.com
  *              firstName: user1
  *              lastName: test1
  *              roles: {}
  *              profile: {}
  *              avatarFile: avaatarlink
  *      putAvatarS:
  *          type: object
  *          required:
  *              -avatarFile
  *          properties:
  *              avatarFile:
  *                     type: file  
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