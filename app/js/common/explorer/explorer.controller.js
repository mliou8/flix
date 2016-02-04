angApp.controller('ExplorerCtrl', function($scope, $element, vidConstants,
  Storage, initialize, $rootScope, $state) {
  // Code to make the 'file holder div' take in
  // file path names

  // $rootScope.$on('dbLoaded', function() {
  //   console.log('initialized', Storage.findOrCreate(soln.name).then(result=> console.log(result)));
  //   // .then(function(result) {console.log(result)});
  // })

  var homedir = (process.platform === 'win32') ? process.env.HOMEPATH :
    process.env.HOME;
  const shell = require('electron').shell;
  // var finder = require('./server/algorithms/search.js')
  var fs = require('fs');
  var path = require('path');
  var find = require('findit');
  var parseVideo = require('video-name-parser');

  //Button called "browse", opens homedirectory of user
  $scope.openHome = function() {
    return shell.showItemInFolder(homedir);
  }

  // --------------------------
  // Code that allows you to recurse through the directories
  //provided and return file names that end with certain exts

  var holder = document.getElementById('fileholder');
  holder.ondragover = function() {
    this.className = 'hover';
    return false;
  };
  holder.ondragleave = function() {
    this.className = '';
    return false;
  };
  holder.ondrop = function(e) {
    var dataPathArray = [];
    var soln = [];
    e.preventDefault();
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      dataPathArray.push(e.dataTransfer.files[i].path);
    }
    dataPathArray.forEach(function(data) {
      var finder = find(data);
      finder.on('file', function(file, stat) {
        var mediaName = file.split("/").pop()
        if (vidConstants.vidExtensions.indexOf(path.extname(file)) !==
          -1) {
          var parsed = parseVideo(mediaName);
          parsed.filePath = file
          soln.push(parsed);
        }
      })
      finder.on('end', function(file, stat) {

        soln.forEach(function(eachFile) {
          var mediaObj = {
            terms: eachFile.name,
            year: eachFile.year,
            season: eachFile.season,
            episode: eachFile.episode
          }
          console.log('before find or create')
          Storage.findOrCreate(mediaObj).then(result =>
            console.log(result))
        })
        $state.go('dashboardState')
      })
    })
    return false;
  };
});


angApp.factory('vidConstants', function() {
  return {
    vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv']
  }
})
