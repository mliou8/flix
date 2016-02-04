angApp.controller('NavCtrl', function($rootScope, $scope) {

  //Toggle showing and hiding playlists
  $scope.showPlaylists = false;

  $scope.togglePlaylists = function() {
    console.log("Fired off");
    $scope.showPlaylists = !$scope.showPlaylists;
  }

})
