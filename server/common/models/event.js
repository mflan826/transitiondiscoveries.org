"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const multer = require("multer");
const util = require("util");
const {getImagesUploadPath} = require("../../common");

const s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (Event) {
  // Returns a URL friendly slug
  function createSlug(value) {
    return value
      .replace(/[^a-z0-9_]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
  }

  Event.upload = function (req, res, callback) { 
    const storage = multer.memoryStorage();

    const upload = multer({
      storage: storage,
    });

    upload.any()(req, res, async (err) => {
      if (err) reject(err);
      else {
        let eventReqPayload = { ...req.body }; 
      
        if (req.files.length > 0) {
          const file = req.files[0]; 
          var params = {
            Bucket: BUCKET_NAME,
            Key: getImagesUploadPath('events') + file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
          };

          s3.upload(params, function (err, resp) {
            if (err) {
              console.error(err);
              return reject(err);
            }
            let itemUploaded = {
              url: resp.Location,
              bucket: resp.Bucket,
              key: resp.Key,
            };

            let eventUploaded = { ...req.body }; 
            const thumbnailObject = new Object();
            thumbnailObject.src = itemUploaded.url;
            thumbnailObject.title = itemUploaded.key;
            eventUploaded.thumbnail = thumbnailObject;

            let createdEvent;
            if (eventUploaded.id) { 
              createdEvent = Event.update(
                { id: eventUploaded.id },
                eventUploaded
              );
            } else { 
              eventUploaded.link = createSlug(eventUploaded.title);
              createdEvent = Event.create(eventUploaded);
            }

            res(null, createdEvent);
          });
        } else {
          
          let eventUpdated = { ...req.body };  
          if(eventUpdated.id){ 
            delete eventUpdated.thumbnail;
            const updatedEvent = Event.update(
              { id: eventUpdated.id },
              eventUpdated
            );
            res(null, updatedEvent);
          } else {
            let createdEvent; 
            eventUpdated.link = createSlug(eventUpdated.title);
            createdEvent = Event.create(eventUpdated);
            res(null, createdEvent);
          }
         
        }
      }
    });
  };
};
