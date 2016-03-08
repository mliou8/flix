angApp.directive('player', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: './app/js/common/directives/player/player.html',
		link: function(scope, element, attribute) {
			var $ = require('jquery');
			var wjs = require('wcjs-player');
			var chromecastjs = require('chromecast-js');
			window.devices = [];
			var browser = new chromecastjs.Browser();


      window.player = new wjs("#player").addPlayer({ autoplay: true });
      $rootScope.hideSidebar = true;
      player.addPlaylist(scope.filePath);
      $(".wcp-surface").append( '<div class="wcp-titlebar"><button class="backbutton" onclick="goBack(window.player)"><i class="fa fa-arrow-left fa-2x"></i></button></div>');
      window.goBack = function(player){
        $rootScope.hideSidebar = false;
        player.clearPlaylist();
        scope.goHome();
      };

			browser.on('deviceOn', function(device){
				$(".wcp-toolbar").append('<div class="wcp-button wcp-right"><button><img src="./app/assets/icons/ic_cast_grey.png"></button></div>');
			});

			// browser.on('deviceOn', function(device){
      //   device.connect()
      //   device.on('connected', function(){
      //
      //     device.play(movie, 60, function(){
      //         console.log('Playing in your chromecast!')
      //     });
      //   })
      // })



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
