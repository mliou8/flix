angApp.controller('PlaylistsCtrl', function($scope, Storage) {

  $scope.playlists = ['playlist1', "playlist2", "playlist3"];
  $scope.showForm = false;
  $scope.addNewForm = function() {
    $scope.showForm = true;
  }
  $scope.createPlaylist = function() {
    console.log($scope.name);
    $scope.showForm = false;
    Storage.findOrCreate($scope.name)
      .then(result => console.log(result));
  }

})
