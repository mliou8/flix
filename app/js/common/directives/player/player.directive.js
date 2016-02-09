angApp.directive('player', function() {
  return {
    restrict: 'E',
    templateUrl: './app/js/common/directives/player/player.html',
    link: function(scope, element, attribute){
      var wjs = require("wcjs-player")
      var player = new wjs("#player").addPlayer({ autoplay: true });
      player.addPlaylist(scope.filePath);
    }
  };
});
