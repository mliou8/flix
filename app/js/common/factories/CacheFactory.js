var db = require(__dirname+"/server/db.js");

app.factory('Cache', function() {
  return db;
});
