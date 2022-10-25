"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const FILE_NAME = "Whatworkstest.json";
const { basename } = require("path");
const {getImagesUploadPath, getJsonUploadPath, getIndicatorFullNameByKey} = require("../../common");
const { Role } = require("loopback");

let s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (WhatWorksTest) {
  const getWhatworksDataById = (id) => {
    return new Promise((resolve, reject) => {
      try {
        WhatWorksTest.find({ where: { id: id } }, function (err, resp) {
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

  const combineKeyData = (data) => {
    var output = {}, item;
    for (var i = 0; i < data.length; i++) {
        item = data[i];
        for (var prop in item) {
            if (item.hasOwnProperty(prop)) {
                if (!(prop in output)) {
                    output[prop] = [];
                }
                output[prop].push(item[prop]);
            }
        }
    }
    return output;
  }

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
  const publishManager = async (WhatWorksTest, id) => {
    try {
      //get data based on whatworks id
      const itemFetched = await getWhatworksDataById(id);

      //upload file
      const fileUploaded = await uploadFileToS3(itemFetched.data);

      //save to database
      const updateData = await WhatWorksTest.upsertWithWhere(
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
  WhatWorksTest.publish = function (id, callback) {
    publishManager(WhatWorksTest, id)
      .then((res) => {
        callback(null, res);
      })
      .catch((error) => {
        console.error(error);
        callback(error);
      });
  };

  // generate GraphData
  const generateGraphData = (WhatWorksTest , params) => {
    return new Promise((resolve, reject) => {
    try {
        WhatWorksTest.find({}, function (err, resp) {
          if (err) {
            console.error(err);
            return reject(err);
          }

        const keyData = [];
        const IndicatorData = [];
        const SubIndicatorData = [];

        params.Role.forEach( ROLE => {
          let QISKeyName = "";
          let SDevKeyName = "";
          switch (ROLE) {
            case "Y":
              QISKeyName = "YOUTH_QIS";
              SDevKeyName = "YOUTH_sdev";
              break;
            case "F":
              QISKeyName = "FAMILY_QIS";
              SDevKeyName = "FAMILY_sdev";
              break;
            case "S":
              QISKeyName = "SH_QIS";
              SDevKeyName = "SH_sdev";
              break;
            
            default:
              QISKeyName = "ALL_QIS";
              SDevKeyName = "ALL_sdev";
              break;
          }

          let data = resp[0].data.filter(x => {
            if ( ROLE == x['ROLE'] && params.Age.indexOf(x['Age']) > -1){
              return x;
            }else if( ROLE == 'ALL' && params.Age.indexOf(x['Age']) > -1){
              return x;
            }
          });

          keyData[ROLE] = combineKeyData(data);

          delete(keyData[ROLE]['ROLE']);
          delete(keyData[ROLE]['Age']);
          delete(keyData[ROLE]['Geographical Region']);

          for(var key in keyData[ROLE]){
            if(keyData[ROLE].hasOwnProperty(key)){
              let values = keyData[ROLE][key];
              let count = values.length;
              let QIS = values.reduce((a, b) => Number(a) + Number(b))/count;;
              let standardDev = Math.sqrt(
                values.map((x) => Math.pow(x - QIS, 2)).reduce((a, b) => Number(a) + Number(b))/count
              );
              let sdevUpper = QIS + 1.96 * (standardDev / count);
              let sdevLower = QIS - 1.96 * (standardDev / count);
              //create data object from calculated values
              let obj = new Object();
              obj.key = key;
              obj[QISKeyName] = new Number(QIS.toFixed(2));
              obj[SDevKeyName] = [
                new Number(sdevLower.toFixed(2)),
                new Number(sdevUpper.toFixed(2)),
              ];
              if (obj.key.includes("_")) {
                if (SubIndicatorData.length > 0) {
                  const found = SubIndicatorData.some(
                    (el) => el.key === obj.key
                  );
                  if (found) {
                    let index = SubIndicatorData.findIndex(
                      (el) => el.key === obj.key
                    );
                    Object.assign(SubIndicatorData[index], obj);
                  } else {
                    SubIndicatorData.push(obj);
                  }
                } else {
                  SubIndicatorData.push(obj);
                }
              } else {
                if (IndicatorData.length > 0) {
                  const found = IndicatorData.some(
                    (el) => el.key === obj.key
                  );
                  if (found) {
                    let index = IndicatorData.findIndex(
                      (el) => el.key === obj.key
                    );
                    Object.assign(IndicatorData[index], obj);
                  } else {
                    IndicatorData.push(obj);
                  }
                } else {
                  IndicatorData.push(obj);
                }
              }
              
            }
          }
        });

        IndicatorData.forEach((item) => {
          let subIndicators = SubIndicatorData.filter((subItem) => {
            return subItem.key.startsWith(item.key + "_");
          });
          item.name = getIndicatorFullNameByKey(item.key);
          subIndicators.forEach((subIndicatorItem) => {
            subIndicatorItem.name = getIndicatorFullNameByKey(subIndicatorItem.key);
          });
          item.subIndicators = subIndicators;
        });

        return resolve(IndicatorData);
        });
    } catch (error) {
      console.error(error);
        return reject(error);
    }
    });
  };

  WhatWorksTest.filter = function (req, res) {
    return new Promise((resolve, reject) => {
      try {
        let params = { ...req.body };
        generateGraphData(WhatWorksTest, params)
          .then((data) => {
            return resolve(data);
          })
          .catch((error) => {
            console.error(error);
            return reject(error);
          });
      } catch (error) {
        console.error(error);
          return reject(error);
      }
    });
  }

};
