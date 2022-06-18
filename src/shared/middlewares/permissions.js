const permissions = require('../resources/user-types');
const config = require('../../config/env');
const jwt = require('jsonwebtoken');

async function havePermissions(bearerHeader, action){
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  if (token) {
      const decoded = await jwt.verify(token, config.JWT_SECRET);
      if (decoded) {
        const usertype = decoded.dataToken.typeUser
        const type = permissions[usertype];
        console.log(decoded.dataToken.isActive);
        if (decoded.dataToken.isActive) {
          return type[action]
          
        }
        return false
      }
  }
}

module.exports = havePermissions;