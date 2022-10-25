'use strict';

const multer = require("multer");
var app = require('../../server/server');

module.exports = function (Globalsearch) {
    Globalsearch.search = async (req, res, callback) => {
        let searchedData = [];
        let { q, current_page, per_page_items } = { ...req.query };
        if (!q) {
            q = "";
        }
        const pattern = new RegExp('.*' + q + '.*', "i");

        const Blog = app.models.blog;
        let blogData = await Blog.find({ where: { or: [{ title: { like: pattern } }, { body: { like: pattern } }] } });
        blogData.map(function(el) {
            el.type = "blogs";
            return el;
        })
        searchedData.push(blogData);

        const Event = app.models.Event;
        let eventData = await Event.find({ where: { or: [{ title: { like: pattern } }, { body: { like: pattern } }] } });
        eventData.map(function(el) {
            el.type = "events";
            return el;
        })
        searchedData.push(eventData);

        const Resources = app.models.Resources;
        let resourcesData = await Resources.find({ where: { or: [{ name: { like: pattern } }, { description: { like: pattern } }] } });
        resourcesData.map(function(el) {
            el.type = "resources";
            return el;
        })
        searchedData.push(resourcesData);

        const StoryListing = app.models.story_listing;
        let storyListingData = await StoryListing.find({ where: { or: [{ title: { like: pattern } }, { body: { like: pattern } }] } });
        storyListingData.map(function(el) {
            el.type = "story-listings";
            return el;
        })
        searchedData.push(storyListingData);

        const Team = app.models.Team;
        let teamData = await Team.find({ where: { or: [{ TeamMemberJobTitle: { like: pattern } }, { TeamMemberName: { like: pattern } }, { bio_content: { like: pattern } }, { bio_content2: { like: pattern } }, { bio_content3: { like: pattern } }] } });
        teamData.map(function(el) {
            el.type = "team";
            return el;
        })
        searchedData.push(teamData);
        searchedData = searchedData.flat(1);
        
        let page = current_page || 1;
        let per_page = per_page_items || 10;
        let offset = (page - 1) * per_page;
        let paginatedItems = searchedData.slice(offset).slice(0, per_page_items);
        
        res(null, paginatedItems);
    }
};

