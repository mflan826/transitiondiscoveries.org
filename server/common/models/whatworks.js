"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const FILE_NAME = "Whatworks.json";
const { basename } = require("path");
const {getImagesUploadPath, getJsonUploadPath} = require("../../common");

let s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (WhatWorks) {
  const getWhatworksDataById = (id) => {
    return new Promise((resolve, reject) => {
      try {
        WhatWorks.find({ where: { id: id } }, function (err, resp) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          if (resp.length > 0) {
            let itemFetched = resp[0];

            return resolve(itemFetched);
          } else {
            console.error("Invalid Whatworks Id");
            return reject("Invalid Whatworks Id");
          }
        });
      } catch (error) {
        console.error(error);
        return reject(error);
      }
    });
  };

  //upload json file to S3
  const uploadFileToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
      try {
        let params = {
          ACL: "public-read",
          Body: JSON.stringify(fileData),
          Bucket: BUCKET_NAME,
          Key: getJsonUploadPath('what-works') + FILE_NAME,
        };

        s3.putObject(params, function (err, resp) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          let itemUploaded = {
            filename: basename(params.Key),
          };
          return resolve(itemUploaded);
        });
      } catch (error) {
        console.error(error);
        return reject(error);
      }
    });
  };

  //manages getting data from database and upload to s3
  const publishManager = async (WhatWorks, id) => {
    try {
      //get data based on whatworks id
      const itemFetched = await getWhatworksDataById(id);

      //upload file
      const fileUploaded = await uploadFileToS3(itemFetched.data);

      //save to database
      const updateData = await WhatWorks.upsertWithWhere(
        { id: id },
        { status: "PUBLISHED" }
      );
      Promise.resolve(updateData);
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
  };

  //publish endpoint to get data, create and upload file
  WhatWorks.publish = function (id, callback) {
    publishManager(WhatWorks, id)
      .then((res) => {
        callback(null, res);
      })
      .catch((error) => {
        console.error(error);
        callback(error);
      });
  };
};
