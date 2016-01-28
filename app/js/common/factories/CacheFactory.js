app.factory('Cache', function(DS) {
  var LocalCache = DS.defineResource('localcache');
  return {
    createRecord: function () {
      return LocalCache.
    }
  }
})
