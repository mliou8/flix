var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
module.exports = router;


router.get('/:imdbId', function(req, res, next) {
  var rawData = fs.readFileSync(path.resolve(__dirname, '../../app.db'));
  var data = _.find(JSON.parse(rawData).collections, {name:'media'}).data;
  var imdbId = req.params.imdbId;
  var itemPath = _.find(data, {_id: imdbId}).path;

  res.sendFile(itemPath);
})

// /user/matthewkim/library/desktop/rickandmorty/
router.get('/:imdbId/:season/:episode', function(req, res, next){
  var rawData = fs.readFileSync(path.resolve(__dirname, '../../app.db'));
  var data = _.find(JSON.parse(rawData).collections, {name:'media'}).data;

  var imdbId = req.params.imdbId;
  var season = req.params.season;
  var episode = req.params.episode;

  var epArr = _.find(data, {_id: imdbId}).seasons[season];
  var itemPath;
  epArr.forEach(function(item) {
    if (item.num == episode) {
      itemPath = item.path;
    };
  });

  res.sendFile(itemPath);
})
