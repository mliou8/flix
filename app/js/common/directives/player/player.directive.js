angApp.directive('player', function() {
	return {
		restrict: 'E',
		templateUrl: './app/js/common/directives/player/player.html',
		link: function(scope, element, attribute) {
			var $ = require('jquery')
			var wjs = require("wcjs-player")
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
			var player = new wjs("#player").addPlayer({
				autoplay: true
			});
			player.addPlaylist(scope.filePath);
			setTimeout(function() {
				$(".wcp-surface").append('<div class="wcp-titlebar"><i class="fa fa-arrow-left"></i></div>');
			}, 3000);

		}
	};
});
