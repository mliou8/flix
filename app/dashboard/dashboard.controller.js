angApp.controller('DashboardCtrl', function($rootScope, $scope, Storage, initialize){
  //code
  $rootScope.$on('dbLoaded', function() {
    console.log('initialized', Storage.findOrCreate('Rick and Morty').then(result=> console.log(result)));
    // .then(function(result) {console.log(result)});
  })

})
