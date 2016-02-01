var express = require('express');
var expApp = express();
var path = require('path');
var multer  =   require('multer');

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

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

expApp.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
