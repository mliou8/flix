

app.controller('Explorer', function ($scope) {
      // Code to make the 'file holder div' take in
      // file path names
      var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
      const shell = require('electron').shell;
      // var finder = require('./server/algorithms/search.js')
      var fs = require('fs');
      var path = require('path');
      var find = require('findit');
      var parseVideo = require('video-name-parser');


      //Button called "browse", opens homedirectory of user
      $scope.openHome = function () {
        return shell.showItemInFolder(homedir);
      }

       var holder = document.getElementById('fileholder');
       holder.ondragover = function () { this.className = 'hover'; return false; };
       holder.ondragleave = function () { this.className = ''; return false; };
       holder.ondrop = function (e) {
         e.preventDefault();
         for (var i = 0; i < e.dataTransfer.files.length; ++i) {
           console.log(e.dataTransfer.files[i].path);
        }
        var dataPath = e.dataTransfer.files[0].path;
        var finder = find(dataPath);

      finder.on('file', function (file, stat) {
           var showString = file.split('/');
           var temp = showString[showString.length - 1].split(".");
            if (vidExtensions.indexOf(temp[temp.length - 1]) !== -1) {
              soln.push(parseVideo(file));
            }
            console.log("Thank you for your patience!");
         })
      finder.on('end', function (file, stat) {
           console.log('soln', soln)
         })
         return false;
       };



       var vidExtensions = ['mkv', 'avi', 'mov', 'gifv', 'flv'];
       var soln = [];

      //  finder.setFinder(e.dataTransfer.files[i].path);


});
