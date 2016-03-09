var express = require('express');
var expApp = express();
var path = require('path');
var rootPath = path.join(__dirname, '..')
expApp.listen(3000, function() {
  var host = this.address().address;
  var port = this.address().port;

  console.log('app listening at http://%s:%s', host, port);
});

expApp.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./index.html'));
})
expApp.use(express.static(rootPath))
expApp.use('/transcode', express.static(path.join(rootPath, '/app/assets/transcoded')))
expApp.use('/allFiles', require('./routes/all_files'))
expApp.use('/playlists', require('./routes/playlists'))
expApp.use('/recently_added', require('./routes/recently_added'))
expApp.use('/movies', require('./routes/movies'))
expApp.use('/shows', require('./routes/shows'))
expApp.use('/catalog', require('./routes/catalog'))


expApp.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
})
module.exports = expApp
