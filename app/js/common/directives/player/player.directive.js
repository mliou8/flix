angApp.directive('player', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: './app/js/common/directives/player/player.html',
    link: function(scope, element, attribute) {
      var $ = require('jquery');
      var wjs = require('wcjs-player');
      var chromecastjs = require('chromecast-js');
      var ffmpeg = require('fluent-ffmpeg');
      var path = require('path');
      window.splitFilePath = scope.filePath.split('.');
      var extension = splitFilePath.pop().toLowerCase();
      var browser = new chromecastjs.Browser();
      window.saveTranscodePath = path.join(__dirname, '/app/assets/transcoded/');
      $rootScope.hideSidebar = true;

      // Chromecast devices discovered on the network
      window.devices = [];

      // Toggle for determining if currently casting
      window.casting = false;

      window.player = new wjs('#player').addPlayer({ autoplay: true });

      // Used to return to singleItemView
      window.goBack = function(player) {
        $rootScope.hideSidebar = false;
        player.clearPlaylist();
        scope.goHome();
      };

      window.cast = function() {
        var device = devices[0];
        if (casting == false) {
          device.connect();
          device.on('connected', function() {
            if (extension == 'mp4') {
              device.play(scope.filePath, 60, function(){
                console.log('Playing ' + scope.filePath + ' on your chromecast!');
              })
            } else {
              var newPath = splitFilePath.join('.');
              newPath = newPath.split('/');
              var fileName = newPath.pop();
              var httpRoute = 'http://localhost:1337/transcoded/' + fileName + '.mp4';

              var command = ffmpeg(scope.filePath)
              .audioCodec('aac')
              .videoCodec('libx264')
              .format('mp4');

              command
              .save(saveTranscodePath + fileName + '.mp4');
              setTimeout(function(){
                device.play(scope.filePath, 0, function(){
                  console.log('Playing Transcoded');
                });
              }, 3000);
            }
          });
        } else {
          device.stop();
          casting = false;
        }
      };


      player.addPlaylist(scope.filePath);
      $('.wcp-surface').append('<div class="wcp-titlebar"><button class="backbutton" onclick="goBack(window.player)"><i class="fa fa-arrow-left fa-2x"></i></button></div>');

      browser.on('deviceOn', function(device) {
        $('.wcp-toolbar').append('<div class="wcp-button wcp-right"><button onclick="cast()"><img src="./app/assets/icons/ic_cast_grey.png"></button></div>');
        devices.push(device);
        console.log(extension);
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



      var Annyang = require('annyang');
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        'video pause': function() {
          player.togglePause();
        },
        'video paws': function() {
          player.togglePause();
        },
        'video play': function() {
          player.togglePause();
        },
        'mute': function() {
          player.toggleMute();
        },
        '*allSpeech': function(allSpeech) {
          console.log(allSpeech);
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();

    }
  };
});
