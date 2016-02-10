var _ = require('lodash');
angApp.controller('DashboardCtrl', function($rootScope, $scope, Storage,
  playlistService) {
  Storage.init();
  $rootScope.$on('dbLoaded', function() {
    $scope.$apply($scope.allMedia = Storage.allMedia.data);
  });

  $rootScope.$on('newMediaAdded', (event) => {
    $scope.$apply($scope.allMedia = Storage.allMedia.data);
  });

  function findByName(name) {
    return _.find($scope.allMedia, {
      title: name
    });
  }
  function findByType(type) {
    return _.filter($scope.allMedia, {
      type: type
    });
  };

  function findByGenre(genre) {
    return _.filter($scope.allMedia, {
      genre: genre
    });
  };

  $scope.filtered = false;
  $scope.$on('handleBroadcast', function() {
    //Which version of playlist is shown
    $scope.filtered = true;

    //Filter function broken out
    function compare(value) {
      for (var i = 0; i < $scope.message.media.length; i++) {
        // console.log("message media ", $scope.message.media[i]);
        // console.log("Value ", value)
        if ($scope.message.media[i]._id == value._id) {
          console.log("true");
          return true;
        }
      }
      // return ($scope.message.media.indexOf(value) !== -1);
    }
    $scope.message = playlistService.message;
    $scope.filteredMedia = $scope.allMedia.filter(compare);
    // console.log("$scope.allMedia ", $scope.allMedia);
    // console.log("$scope.filteredMedia ", $scope.filteredMedia);
  });

  //Return to show all
  $scope.$on('handleState', function() {
    $scope.filtered = false;
  })

    $scope.playlists = Storage.findAllPlaylists();

  $scope.editPlaylist = function(playlist, media) {
    // console.log("playlist is ", playlist);
    // console.log("media is ", media);
    if (!playlist) {
      alert("not a valid selection");
    }
    Storage.updatePlaylist(playlist.name, media);
  }
})
