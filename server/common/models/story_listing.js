"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const multer = require("multer");
const util = require("util");
const {createSlug, getImagesUploadPath} = require("../../common");

const s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (Story_listing) {
  Story_listing.upload = function (req, res, callback) {
    const storage = multer.memoryStorage();

    const upload = multer({
      storage: storage,
    });

    upload.any()(req, res, async (err) => {
      if (err) reject(err);
      else {
        console.log(req.files.length);
        if (req.files.length > 0) {
          const file = req.files[0];
          console.log(file.originalname);
          var params = {
            Bucket: BUCKET_NAME,
            Key: getImagesUploadPath('story-listings') + file.originalname,
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

            let storyUploaded = { ...req.body };

            const thumbnailObject = new Object();
            thumbnailObject.src = itemUploaded.url;
            thumbnailObject.title = itemUploaded.key;
            storyUploaded.thumbnail = thumbnailObject;

            let createdStory;
            if (storyUploaded.id) {
              createdStory = Story_listing.update(
                { id: storyUploaded.id },
                storyUploaded
              );
            } else {
              storyUploaded.link = createSlug(storyUploaded.title);
              createdStory = Story_listing.create(storyUploaded);
            }

            res(null, createdStory);
          });
        } else {
          let storyUpdated = { ...req.body };
          delete storyUpdated.thumbnail;
          const updatedStory = Story_listing.update(
            { id: storyUpdated.id },
            storyUpdated
          );
          res(null, updatedStory);
        }
      }
    });
  };
};
