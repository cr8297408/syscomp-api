const AWS = require('aws-sdk');
const config = require('../env');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.AWS_REGION
})

module.exports = s3;