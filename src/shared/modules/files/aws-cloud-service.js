const fs = require('fs');
const config = require('../../../config/env');
const s3 = require('../../../config/bucket');

const FileService = {

  async uploadFile(path, originalname){
    const bodyFile = fs.createReadStream(path);
      const paramsSnap = {
          Bucket: config.AWS_BUCKET,
          Key: originalname,
          Body: bodyFile,
          ACL: 'public-read',//TODO 😎
      };
      s3.upload(paramsSnap, async function (err, data) {
        if (err) {
            throw new Error('error in callback',err)
        }
        // delete file in the server
        await fs.unlink(`./uploads/${originalname}`,function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        });
      });
      const avatar = `${config.AWS_URL}/${originalname}`
      

      return avatar;
  },

  async drop(key){
    try {
      return new Promise((resolve, reject) => {
        s3.deleteObject({Key:key, Bucket: config.AWS_BUCKET }, (err) => {
          if (err) {
            reject(err)
          }
          resolve('objeto eliminado...')
        })
      })
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getReadUrl(key){
    try {
      return {
        Key: key,
        url: `${config.AWS_URL}/${key}`
      }  
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getSignedUrl(operation, Key, Expires, ContentType){
    try {
      const params = {
        Bucket: this._appConfig.aws.bucket,
        Key,
        Expires,
        ContentType,
      };
      const url = await s3.getSignedUrlPromise(operation, params);

      return {
        Url: url 
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = FileService;