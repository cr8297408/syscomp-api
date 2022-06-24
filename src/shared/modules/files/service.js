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
  }

}

module.exports = FileService;