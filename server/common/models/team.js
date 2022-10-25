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

module.exports = function (Team) {
    // function to fetch team member by ID
    const getTeamMemberDataById = (id) => {
      return new Promise((resolve, reject) => {
        try {
          Team.find({ where: { id: id }} , function (err, resp) {
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

    Team.upload = function (req, res, callback) {
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
                  InstaLink: teamUploaded.InstaLink || '',
                  LinkedInLink: teamUploaded.LinkedInLink || ''
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
              InstaLink: teamUpdated.InstaLink || '',
              LinkedInLink: teamUpdated.LinkedInLink || ''
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
  Team.teamData = async (id, callback) => {
    try {
        const teamMemeberData = await getTeamMemberDataById(id)
        let itemFetched = teamMemeberData[0];
        const { fbLink, twLink,InstaLink ,LinkedInLink , bio_content,bio_content2,bio_content3,slug}= itemFetched
        itemFetched.facebook = fbLink || ''
        itemFetched.twitter = twLink || ''
        itemFetched.instagram = InstaLink || ''
        itemFetched.linkedin = LinkedInLink || ''
        itemFetched.body = bio_content || ''
        itemFetched.body2 = bio_content2 || ''
        itemFetched.body3 = bio_content3 || ''
        itemFetched.slug =slug || ''
        delete itemFetched.links
        delete itemFetched.bio_content
        callback(null, itemFetched);
    }
    catch (error) {
        callback(error);
    }
  }
  Team.getAllTeamData = async (callback) => {
    try {

        const teamMemeberData = await getAllTeamMemberData()
       // callback(null, teamMemeberData);
       return teamMemeberData;
    }
    catch (error) {
        callback(error);
    }
  }



  Team.updateTeamMemberData = async (req, callback) =>{
    try {
      const updateMemberData = { ...req.body };
      const teamData = await getTeamMemberDataById(updateMemberData.id);

      await updateTeamMemberDataById(updateMemberData)
      return updateMemberData;
    }catch (error) {
        callback(error);
    }
  }

  Team.deleteTeamMemberData = async(id, callback) =>{
    try {
      console.log("requ", id);

      const teamId = req.params("id");
      console.log("teamId", teamId);

    }catch (error) {
        callback(error);
    }
  }
  Team.publish = async function (req, res, callback) {
    const teamMemeberData = await getAllTeamMemberData();

    const teamMemberTemplate = fs.readFileSync(path.resolve("../server/server/template/template.json"));
    let publishTeamMemberData = teamMemberTemplate.toString();

    publishTeamMemberData = publishTeamMemberData.replace("${Team}", JSON.stringify(teamMemeberData));

    const TeamMemberDataBuffer = new Buffer.from(publishTeamMemberData);

    var params = {
      Bucket: BUCKET_NAME,
      Key: 'team/team.json',
      Body: TeamMemberDataBuffer,
      ContentType: "application/json",
      ACL: "public-read",
    };
    s3.upload(params, function (err, resp) {
      if (err) {
        console.error("publish: team.json s3 upload", err);
        return reject(err);
      }
      console.log('Team Json generated Success', resp);
    });


    /* Generate json file for each team member and upload it ot S3 Buckt. Process Initiatied ---->*/
    for (var i=0;i<teamMemeberData.length;i++)
    {
      await generatejsonOfTeamMember(teamMemeberData[i].id);
    }
  }

  const renderTemplate = async (tempatePath, notations) =>{
    let teamMemberTemplateData = fs.readFileSync(path.resolve(tempatePath));
    teamMemberTemplateData = teamMemberTemplateData.toString();
    const notationsList = Object.keys(notations);

    for(let i = 0; i < notationsList.length; i++){
      teamMemberTemplateData = teamMemberTemplateData.replace('${'+notationsList[i]+'}', notations[notationsList[i]]);
     }
     return  teamMemberTemplateData;
  }


  const generatejsonOfTeamMember = async (id) => {
    let teamMemeberData = await getTeamMemberDataById(id);

    teamMemeberData = teamMemeberData[0];

    const notations = {
      "name": teamMemeberData.TeamMemberName,
      "title": teamMemeberData.TeamMemberJobTitle,
      "image": teamMemeberData.TeamMemberImage.title,
      "biocontent": teamMemeberData.bio_content,
      "biocontent2": teamMemeberData.bio_content2,
      "biocontent3": teamMemeberData.bio_content3,
      "slug":  teamMemeberData.slug,
      "fb":  teamMemeberData.fbLink,
      "twitter": teamMemeberData.twLink,
      "instagram": teamMemeberData.InstaLink,
      "linkedin": teamMemeberData.LinkedInLink,
    }

    const teamMememberFinalData = await renderTemplate("../server/server/template/teamdetails.json", notations)
    const TeamMemberDataBuffer = new Buffer.from(teamMememberFinalData);

    var params = {
      Bucket: BUCKET_NAME,
      Key: getJsonUploadPath('Team')+ teamMemeberData.slug+'.json',
      Body: TeamMemberDataBuffer,
      ContentType: "application/json",
      ACL: "public-read",
    };
    s3.upload(params, function (err, resp) {
      if (err) {
        console.error("generatejsonOfTeamMember: s3 upload", err);
        return reject(err);
      }
      console.log('team details s3 upload sccuess ', resp);
      return resp;
    });

  };

}
