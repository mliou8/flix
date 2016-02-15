angApp.directive('player', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: './app/js/common/directives/player/player.html',
		link: function(scope, element, attribute) {
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
			var Annyang = require('annyang')
			// Let's define our first command. First the text we expect, and then the function it should call
		  var commands = {
		    'video pause': function() {
		      player.togglePause();
		    },
				'video paws': function(){
					player.togglePause();
				},
				'video play': function() {
		      player.togglePause();
		    },
				'mute': function(){
					player.toggleMute();
				},
				'*allSpeech': function(allSpeech){
					console.log(allSpeech)
				}
		  };

		  // Add our commands to annyang
		  annyang.addCommands(commands);

		  // Start listening. You can call this here, or attach this call to an event, button, etc.
		  annyang.start();

		}
	};
});
