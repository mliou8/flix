var Promise = require('bluebird');
var omdb = Promise.promisifyAll(require('omdb'));
var db = require()

function findOmdb (name) {
  return omdb.searchAsync(name)
  .then(function(results) {
    if (results.length < 1) return;
    if (results.length >= 1) {
      return omdb.getAsync(results[0].imdb);
    }
  })
};

module.exports = {
  createOne: function (title) {
    return findOmdb(title)
    .then(function (omdbObj) {
      return db.Media.insert({
        name: title,
        imdbId: omdbObj.imdb.id,
        imdb: omdbObj
      }, function(err, doc) {
        return doc;
      })
    })
  },
  getAll: function() {
    console.log('db shits', db);
    return db.Media.find(function(err, docs) {
      console.log(docs);
      return docs;
    });
  },
  getOne: function(id) {
    console.log('logging id', id);
    console.log('logging db media', db);
    return db.Media.findOne({"imdbId": id}, function(err, doc) {
      console.log(doc);
      console.log(err);
      return doc;
    });
  },
  updateOne: function(id, timestamp) {
    return db.Media.findAndModify({imdbId: id}, {time: timestamp});
  }
}
