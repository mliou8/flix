app.controller('ExplorerCtrl', function($scope, $element, vidConstants) {
  // Code to make the 'file holder div' take in
  // file path names
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
        if (vidConstants.vidExtensions.indexOf(path.extname(file)) !==
          -1) {
          var parsed = parseVideo(file);
          soln.push(parsed);
        }
        console.log("Thank you for your patience!");
      })
      finder.on('end', function(file, stat) {
        // soln.forEach()
        console.log('soln', soln)
      })
    })
    return false;
  };
});


app.factory('vidConstants', function() {
  return {
    vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv']
  }
})
