'use strict';

const S3 = require("aws-sdk/clients/s3");
const { basename, extname } = require("path");
const { readFileSync } = require("fs");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const multiparty = require("multiparty");

let s3 = new S3({
    accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
    secretAccessKey: "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",
});
module.exports = function (Indicators) {

    //get submitted files and fields from form
    const getFileFromRequest = (req) =>
        new Promise((resolve, reject) => {
            const form = new multiparty.Form();
            console.log("inside getFileFromRequest ");
            form.parse(req, (err, fields, files) => {
                console.log("file parsing started ");
                if (err) {
                    console.log(err);
                    reject(err);
                }
                const formData = new Object();
                console.log("number of fields in request" + JSON.stringify(fields));
                formData.fields = fields;
                console.log("number of files in request " + JSON.stringify(files));
                console.log("files length" + Object.entries(files).length);
                if (Object.entries(files).length > 0) {
                    console.log("files");
                    console.log(Object.entries(files));
                    formData.iconImageName = files["iconImageName"][0];
                    formData.imageName = files["imageName"][0];
                }
                if (!formData) {
                    reject("Data not found in request.");
                } else {
                    resolve(formData);
                }
            });
        });

    //Upload File to S3
    const uploadFileToS3 = (file, indicator) => {
        return new Promise((resolve, reject) => {
            try {
                const buffer = readFileSync(file.path);
                let extension = extname(file.path);
                let uploadedFileName = basename(file.originalFilename, extension);
                const fileName =
                    uploadedFileName + "_" + String(Date.now()) + extension;
                //let fileKey = join(String(indicator), fileName);
                let fileKey = String(indicator) + "/" + fileName;
                console.log(fileKey);
                let params = {
                    Body: buffer,
                    Bucket: BUCKET_NAME,
                    Key: fileKey,
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
                        filename: basename(resp.Key),
                    };
                    return resolve(itemUploaded);
                });
            } catch (error) {
                console.error(error);
                return reject(error);
            }
        });
    };

    //manages upload to s3 and saving fields into database
    const uploadManager = async (Indicators, req) => {

        try {
            const fileData = await getFileFromRequest(req);

            if (fileData.iconImageName) {
                //upload file
                const fileUploaded = await uploadFileToS3(
                    fileData.iconImageName,
                    fileData.fields.slug
                );

                if (fileUploaded) {
                    fileData.fields.iconImageName = fileUploaded.url;
                }
            }
            if (fileData.imageName) {
                //upload thumbnail
                const thumbnailUploaded = await uploadFileToS3(
                    fileData.imageName,
                    fileData.fields.slug
                );

                if (thumbnailUploaded) {
                    fileData.fields.imageName = thumbnailUploaded.url;
                }
            }
            if (fileData.fields.id) {
                //update to database
                const createdFile = await Indicators.upsert(fileData.fields);
                Promise.resolve(createdFile);
            } else {
                //save to database
                const createdFile = await Indicators.create(fileData.fields);
                Promise.resolve(createdFile);
            }
            

        } catch (error) {
            console.error(error);
            Promise.reject(error);
        }
    };

    //upload endpoint to upload files and save form fields
    Indicators.upload = function (req, callback) {
        uploadManager(Indicators, req)
            .then((res) => {
                callback(null, res);
            })
            .catch((error) => {
                console.error(error);
                callback(error);
            });
    };

    //upload endpoint to upload files and save form fields
    Indicators.editupload = function (req, callback) {
        edituploadManager(Indicators, req)
            .then((res) => {
                callback(null, res);
            })
            .catch((error) => {
                console.error(error);
                callback(error);
            });
    };
    //manages upload to s3 and saving fields into database
    const edituploadManager = async (Indicators, req) => {

        try {
            const fileData = await getFileFromRequest(req);

            if (fileData.iconImageName) {
                //upload file
                const fileUploaded = await uploadFileToS3(
                    fileData.iconImageName,
                    fileData.fields.slug
                );

                if (fileUploaded) {
                    fileData.fields.iconImageName = fileUploaded.url;
                }
            }
            if (fileData.imageName) {
                //upload thumbnail
                const thumbnailUploaded = await uploadFileToS3(
                    fileData.imageName,
                    fileData.fields.slug
                );

                if (thumbnailUploaded) {
                    fileData.fields.imageName = thumbnailUploaded.url;
                }
            }
            if (fileData.fields.id) {
                //update to database
                const createdFile = await Indicators.upsert(fileData.fields);
            } else {
                //save to database
                const createdFile = await Indicators.create(fileData.fields);
            }
            Promise.resolve(createdFile);

        } catch (error) {
            console.error(error);
            Promise.reject(error);
        }
    };
};
