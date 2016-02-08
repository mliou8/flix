var path = require('path')
var angApp = angular.module('main', ['ui.router', 'lokijs']);

angApp.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

angApp.run(function($rootScope, $state, Storage) {
<<<<<<< HEAD
	Storage.init();
	// $rootScope.$on('dbLoaded', function(){
	// 	if (Storage.db.getCollection('media').data.length>0) $state.go('dashboardState')
	// })
=======
    Storage.init();
    $rootScope.$on('dbLoaded', function(){
        if (Storage.db.getCollection('media').data.length > 0) $state.go('dashboardState');
    })
>>>>>>> master
});
