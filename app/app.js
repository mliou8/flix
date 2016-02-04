var loki = require('lokijs'),
	path = require('path')
var angApp = angular.module('main', ['ui.router']);

angApp.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

angApp.run(function(Storage){
  Storage.db = new loki(path.resolve(__dirname, 'app.db')),
  Storage.collection = null
  Storage.loaded = false
  if (Storage.db.collections.length) {
    Storage.collection = Storage.db.getCollection('media');
    Storage.loaded = true;
    return resolve(Storage);
  } else {
    Storage.db.addCollection('media');
    Storage.db.saveDatabase();
    Storage.collection = Storage.db.getCollection('media');
    Storage.loaded = true;
  }
  console.log('loading is done')
})
