var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next){
  fs.readFileAsync(path.resolve(__dirname, '../../app.db'))
  .then(function(file){
    var data = _.find(JSON.parse(file).collections, {name:'media'}).data;
    return data;
  })
  .then(function(data) {
    res.send(data);
  });
})
