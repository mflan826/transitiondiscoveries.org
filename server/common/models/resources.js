"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const multer = require("multer");
const {getImagesUploadPath, getVideosUploadPath, getPdfUploadPath, getAudioUploadPath, createSlug} = require("../../common");

let s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

/**
 * Helper method which takes the request object and returns a promise with the AWS S3 object details.
 */
const uploadFileToS3 = (file, options = {}) => {

  // return a promise
  return new Promise((resolve, reject) => {
    
    console.log(file);
    let path = false;
    if(file.mimetype.match('image.*')){
      path = getImagesUploadPath('resources');
    }

    if(file.mimetype.match('video.*')){
      path = getVideosUploadPath('resources');
    }
    
    if(file.mimetype.match('audio.*')){
      path = getAudioUploadPath('resources');
    }

    if(file.mimetype.match('application/pdf')){
      path = getPdfUploadPath('resources');
    }

    console.log(path);

    var fileParams = {
      Bucket: BUCKET_NAME,
      Key: path + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    return s3.upload(fileParams, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = function (Resources) {
  Resources.upload = function (req, res, callback) {
    const storage = multer.memoryStorage();

    const upload = multer({
      storage: storage,
    });

    upload.any()(req, res, async (err) => {
      if (err) reject(err);
      else {

        let resourceUploaded = { ...req.body };

        if (req.files.length > 0) {
          const thumbnail = req.files.filter(x => x.fieldname.includes("thumbnail")).shift();
          if (thumbnail) {
            const { Location, Key } = await uploadFileToS3(thumbnail);
            const thumbnailObject = new Object();
            thumbnailObject.src = Location;
            thumbnailObject.title = Key;
            resourceUploaded.thumbnail = thumbnailObject;
            console.log("Image uploaded successfully");
          } else {
            delete resourceUploaded.thumbnail;
          }
          const file = req.files.filter(x => x.fieldname.includes("file")).shift();
          if (file) {
            const { Location, Key } = await uploadFileToS3(file);
            const fileObject = new Object();
            fileObject.src = Location;
            fileObject.title = Key;
            resourceUploaded.files = fileObject;
            console.log("File uploaded successfully");
          } else {
            delete resourceUploaded.files;
          }
        } else {
          delete resourceUploaded.thumbnail;
          delete resourceUploaded.files;
        }

        let createdResource;
        if (resourceUploaded.id) {
          const slug=createSlug(resourceUploaded.name);
          const min = 1;
          const max = 100;
          const rand = Math.floor(1 + Math.random() * 900);
          const uniqueSlug= await Resources.find({ where: { path: slug}})
                     if (uniqueSlug.length > 0 && uniqueSlug[0].path==slug && uniqueSlug[0].id!=resourceUploaded.id ) {
                      const newPath=uniqueSlug[0].path;
                      const newSlug=newPath+rand;
                      resourceUploaded.path=newSlug;
                      } 
                    else{
                      resourceUploaded.path=slug;
                     }
          // convert back to array
          resourceUploaded.path = slug;
          resourceUploaded.indicator = JSON.parse(resourceUploaded.indicator);
          resourceUploaded.subindicator = JSON.parse(resourceUploaded.subindicator);
          resourceUploaded.preemploymenttransitionservices = JSON.parse(resourceUploaded.preemploymenttransitionservices);
          resourceUploaded.resourcetypes = JSON.parse(resourceUploaded.resourcetypes);
          resourceUploaded.facilitators = JSON.parse(resourceUploaded.facilitators);
          resourceUploaded.targetaudience = JSON.parse(resourceUploaded.targetaudience);

          createdResource = Resources.update(
            { id: resourceUploaded.id },
            resourceUploaded
          );
        } else {
          const slug=createSlug(resourceUploaded.name);
          const min = 1;
          const max = 100;
          const rand = Math.floor(1 + Math.random() * 900);
          const uniqueSlug= await Resources.find({ where: { path: slug }})
                     if (uniqueSlug.length > 0 && uniqueSlug[0].path==slug) {
                      const newPath=uniqueSlug[0].path;
                      const newSlug=newPath+rand;
                      resourceUploaded.path=newSlug;
                      createdResource = Resources.create(resourceUploaded);
                        } 
                    else{
                      resourceUploaded.path=slug;
                      createdResource = Resources.create(resourceUploaded);
                    }
                  
        }
        res(null, createdResource);
      }
    });
  };
};
