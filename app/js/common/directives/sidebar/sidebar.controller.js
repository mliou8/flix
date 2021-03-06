angApp.controller('SidebarCtrl', function($scope, Storage, $rootScope,
  playlistService, $state) {
  $scope.showForm = false;
  $scope.addNewForm = function() {
    $scope.showForm = true;
  }
  $rootScope.$on('dbLoaded', function() {
    $scope.$apply($scope.playlists = Storage.db.getCollection(
      'playlists').data)
  })
  $rootScope.hideSidebar = false;
  $scope.createPlaylist = function() {
    $scope.showForm = false;
    var playlist = {}
    playlist.name = $scope.name;
    playlist.media = [];
    Storage.createPlaylist(playlist);
  }

  $scope.handleClick = function(msg) {
    playlistService.prepForBroadcast(msg);
  };

  $scope.returnAll = function() {
    playlistService.prepForState();
  }

  $scope.$on('handleState', function() {
    $scope.filtered = false;
  })

  $scope.$on('handleBroadcast', function() {
    $scope.message = playlistService.message;
  });


})
