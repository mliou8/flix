var app = angular.module('main', ['ui.router', 'ngFileUpload']);

app.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/');
})
