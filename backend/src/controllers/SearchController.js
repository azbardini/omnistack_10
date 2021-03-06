const axios = require('axios');
const Dev = require('../models/Dev');
const {
  dbg
} = require('../debug/Debug');
const parseStringArray = require('../utils/parseStringArray');

//Check $in filter and more filtes
//Mongo operators

function index(req, res) {
  dbg("Seaching for Devs...")
  const {
    latitude,
    longitude,
    techs
  } = req.query;
  techsList = parseStringArray(techs);
  Dev.find({
    techs: {
      $in: techsList
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000,
      }
    }
  }).then(result => {
    return res.json(result);
  }).catch(err => {
    return res.json(err)
  });
}

module.exports = {
  index
};
