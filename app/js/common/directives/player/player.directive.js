angApp.directive('player', function() {
  return {
    restrict: 'E',
    templateUrl: './app/js/common/directives/player/player.html',
    link: function(scope, element, attribute){
      var $ = require('jquery')
      var wjs = require("wcjs-player")
      var player = new wjs("#player").addPlayer({ autoplay: true });
      player.addPlaylist(scope.filePath);
      setTimeout(function(){
      $(".wcp-surface").append( '<div class="wcp-titlebar"><i class="fa fa-arrow-left"></i></div>');
    }, 3000);

    }
  };
});
