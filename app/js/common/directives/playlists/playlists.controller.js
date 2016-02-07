angApp.controller('PlaylistsCtrl', function($scope, Storage, $rootScope) {
  $scope.showForm = false;
  $scope.addNewForm = function() {
    $scope.showForm = true;
  }
  $rootScope.$on('dbLoaded', function() {
    $scope.$apply($scope.playlists = Storage.db.getCollection(
      'playlists').data)
  })

  $scope.createPlaylist = function() {
    console.log($scope.name);
    $scope.showForm = false;
    var playlist = {}
    playlist.name = $scope.name;
    playlist.media = [];
    Storage.createPlaylist(playlist);
  }

})
