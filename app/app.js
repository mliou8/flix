var angApp = angular.module('main', ['ui.router']);

angApp.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});
