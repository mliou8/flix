var db = require('lokijs'),
  path = require('path');

angApp.factory('Cache', function() {
  return db;
});
