angApp.directive('player', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: './app/js/common/directives/player/player.html',
    link: function(scope, element, attribute){
      var $ = require('jquery')
      var wjs = require("wcjs-player")
      window.player = new wjs("#player").addPlayer({ autoplay: true });
      $rootScope.hideSidebar = true;
      player.addPlaylist(scope.filePath);
      $(".wcp-surface").append( '<div class="wcp-titlebar"><button class="backbutton" onclick="goBack(window.player)"><i class="fa fa-arrow-left fa-2x"></i></button></div>');
      window.goBack = function(player){
        $rootScope.hideSidebar = false;
        player.clearPlaylist();
        scope.goHome();
      }
    }
  };
});
