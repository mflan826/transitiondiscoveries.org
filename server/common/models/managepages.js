"use strict";

const S3 = require("aws-sdk/clients/s3");
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const multer = require("multer");
const util = require("util");
const {getImagesUploadPath, getJsonUploadPath} = require("../../common");
const { reject } = require("lodash");
const path = require("path");
const fs = require('fs')
const s3 = new S3({
  accessKeyId: "AKIAYO3EJRW2C5SDA3JO",
  secretAccessKey: "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",
});

module.exports = function (managepages) {
    // function to fetch team member by ID
    const getTeamMemberDataById = (id) => {
      return new Promise((resolve, reject) => {
        try {
            managepages.find({ where: { PageName: id }} , function (err, resp) {
            if (err) {
              console.error(err);
              return reject(err);
            }
            if (resp.length > 0) {
              return resolve(resp);
              
            } else {
              console.error("Invalid Team member Id");
              return reject("Invalid Team Id");
            }
          });
        } catch (error) {
          console.error(error);
          return reject(error);
        }
      });
    };
//get all team member data   //blank query
  
    const getAllTeamMemberData = () => {
      return new Promise((resolve, reject) => {
        try {
          Team.find({ }, function (err, resp) {
            if (err) {
              console.error(err);
              return reject(err);
            }
            if (resp.length > 0) {
              return resolve(resp);
            } else {
              console.error("Invalid Team member's data");
              return reject("Invalid Team Id");
            }
          });
        } catch (error) {
          console.error(error);
          return reject(error);
        }
      });
    };

    const updateTeamMemberDataById = (teamUpdated) =>{
      return new Promise((resolve, reject) => {
        try {
          Team.update({ id: teamUpdated.id, teamUpdated }, function (err, resp) {
            if (err) {
              console.error('err', err);
              return reject(err);
            } else {
              return resolve(resp);
            }
          });
        } catch (error) {
          console.error("Team Update err", error);
          return reject(error);
        }
      });
    };

    const deleteTeamMemberData = (id) =>{
      return new Promise((resolve, reject)=>{
        try{
          console.log("id-->", id);
          Team.destroyById({id:id}, (err, resp) =>{
            console.log(err, resp);
            if(err){
              console.log("destroy by Id error", err);
              return reject(err);
            }else{
              return resolve(resp);
            }
          });
        }catch(error){
          console.error("Team delete err", error);
          return reject(error);
        }
      })
    }

    managepages.upload = function (req, res, callback) {
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
              Key: getImagesUploadPath('Team') + file.originalname,
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

              let teamUploaded = { ...req.body };
              const savedTeamInfo = {
                TeamMemberImage: {
                  src: itemUploaded.url,
                  title: itemUploaded.key
              },
                  bio_content: teamUploaded.body,
                  bio_content2: teamUploaded.body2,
                  bio_content3: teamUploaded.body3,
                  slug: teamUploaded.slug,
                  TeamMemberName: teamUploaded.TeamMemberName,
                  TeamMemberJobTitle: teamUploaded.TeamMemberJobTitle,
                  
                  fbLink: teamUploaded.fbLink || '',
                  twLink: teamUploaded.twLink|| '',
                  InstaLink: teamUploaded.InstaLink || ''
        
              }

              let createdTeam;
              if (teamUploaded.id) {
                createdTeam = Team.update({ id: teamUploaded.id }, savedTeamInfo);
              } else {              
                createdTeam = Team.create(savedTeamInfo);
              }
              res(null, createdTeam);
            });
          } else {
            let teamUpdated = { ...req.body };
            const savedTeamInfo = {                //need to be replaced
              fbLink: teamUpdated.fbLink || '',
              twLink: teamUpdated.twLink|| '',
              InstaLink: teamUpdated.InstaLink || ''
            };
            teamUpdated = Object.assign(teamUpdated, savedTeamInfo);
            
            delete teamUpdated.TeamMemberImage;
            const updatedTeam = Team.update({ id: teamUpdated.id }, teamUpdated);
            res(null, updatedTeam);
          }
        }
      });
  };

  //Get team member data by id
  managepages.teamData = async (id, callback) => {
    try {
        console.log("data--->",id);
        const teamMemeberData = await getTeamMemberDataById(id)
        let itemFetched = teamMemeberData[0];
        callback(null, itemFetched);
    }
    catch (error) {
        callback(error);
    }
  }
  managepages.getAllTeamData = async (callback) => {
    try {

        const teamMemeberData = await getAllTeamMemberData()
       // callback(null, teamMemeberData);
       return teamMemeberData;
    }
    catch (error) {
        callback(error);
    }
  }



  managepages.updateTeamMemberData = async (req, callback) =>{
    try {
      const updateMemberData = { ...req.body };
      const teamData = await getTeamMemberDataById(updateMemberData.id);

      await updateTeamMemberDataById(updateMemberData)
      return updateMemberData;
    }catch (error) {
        callback(error);
    }    
  }



}

