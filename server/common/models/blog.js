"use strict";
const dotenv = require('dotenv').config();
const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME
const multer = require("multer");
const util = require("util");
const {createSlug, getImagesUploadPath} = require("../../common");

const s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (Blog) {
  Blog.upload = function (req, res, callback) {
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
          
          var params = {
            Bucket: BUCKET_NAME,
            Key: getImagesUploadPath('blogs') + file.originalname,
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

            let blogUploaded = { ...req.body };

            const thumbnailObject = new Object();
            thumbnailObject.src = itemUploaded.url;
            thumbnailObject.title = itemUploaded.key;
            blogUploaded.thumbnail = thumbnailObject;

            let createdBlog;
            if (blogUploaded.id) {
              createdBlog = Blog.update({ id: blogUploaded.id }, blogUploaded);
            } else {
              blogUploaded.link = createSlug(blogUploaded.title);
              createdBlog = Blog.create(blogUploaded);
            }
            res(null, createdBlog);
          });
        } else {
          let blogUpdated = { ...req.body };
          blogUpdated.link = createSlug(blogUpdated.title);
          delete blogUpdated.thumbnail;
          const updatedBlog = Blog.update({ id: blogUpdated.id }, blogUpdated);
          res(null, updatedBlog);
        }
      }
    });
  };
};
