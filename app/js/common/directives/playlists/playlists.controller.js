angApp.controller('PlaylistsCtrl', function($scope) {

  $scope.playlists = ['playlist1', "playlist2", "playlist3"];
  $scope.newInputs = [];
  $scope.addNewPlaylist = function() {
    $scope.newInputs.push("newitem");
  }


})
