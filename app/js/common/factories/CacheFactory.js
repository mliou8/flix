app.factory('Cache', function(DS) {
  var LocalRecord = DS.defineResource({
    name: 'localRecord',
    imdbId: 'imdbId',
    relations: {
      hasMany: {
        timestamp: {
          localField: 'timestamp',
          foreignKey: 'timestamp.id'
        }
      }
    }
  });
  var TimeStamp = DS.defineResource({
    name: 'timestamp',
    relations: {
      belongsTo: {
        localRecord: {
          localKey: 'localRecord.id',
          localField: 'localRecord'
        }
      }
    }
  });
  var Promise = require('bluebird');
  var omdb = Promise.promisifyAll(require('omdb'));
  function findOmdb (name, year) {
    omdb.search({title: name, year: year})
    .then(function(results) {
    })
  }
  return {
    createRecord: function (name) {
      omdb.get({title: name}, {fullPlot: true, tomatoes: true})
      .then(function(record) {
        record.
        LocalCache.create()
      })
    }
  }
})
