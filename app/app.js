var loki = require('lokijs'),
	path = require('path')
var angApp = angular.module('main', ['ui.router', 'lokijs']);

angApp.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

angApp.run(function(Storage){
	Storage.init();
});
