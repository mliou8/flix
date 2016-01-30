var app = angular.module('main', ['ui.router']);

app.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/');
})
