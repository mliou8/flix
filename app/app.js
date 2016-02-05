var loki = require('lokijs'),
	path = require('path')
var angApp = angular.module('main', ['ui.router', 'lokijs']);

angApp.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

angApp.run(function($rootScope, $state, Storage) {
	Storage.init();
	$rootScope.$on('dbLoaded', function(){
		$state.go('dashboardState')
	})
});
