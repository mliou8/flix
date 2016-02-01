var express = require('express');
var expApp = express();
var path = require('path');
var jsondbfs = require('jsondbfs');

module.exports = expApp

expApp.use('/allFiles', require('./routes/all_files'))
expApp.use('/playlists', require('./routes/playlists'))
expApp.use('/recently_added', require('./routes/recently_added'))
expApp.use('/movies', require('./routes/movies'))
expApp.use('/shows', require('./routes/shows'))

expApp.use(function(err, req, res, next){
  console.log(err);
  res.status(500).send(err.message);
})
