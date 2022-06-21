const permissions = require('../resources/user-types');
const config = require('../../config/env');
const jwt = require('jsonwebtoken');
const User = require('../../shared/modules/user/model')

async function getUser(bearerHeader){
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  if (token) {
      const decoded = await jwt.verify(token, config.JWT_SECRET);
      if (decoded) {
        const user = await User.findByPk(decoded.dataToken.id)
        return user
      }
  }
}

module.exports = getUser;