const exec = require('child_process').exec
const shell = require('electron').shell;
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;

app.controller('Explorer', function ($scope, Upload, $timeout) {
  //Everett and Shafiq's "Glack" code that picks up
  // a file path.
  //  var holder = document.getElementById('holder');
  //  holder.ondragover = function() {
  //    return false;
  //  };
  //  holder.ondragleave = holder.ondragend = function() {
  //    return false;
  //  };
  //  holder.ondrop = function(e) {
  //    e.preventDefault();
  //    e.stopImmediatePropagation()
  //    var file = e.dataTransfer.files[0];
  //    $scope.filePath = file.path
  //    console.log('File you dragged here is', file.path);
  //    $scope.uploadFilePath = file.path.substring(1)
  //    $scope.$digest()
  //    return false;
  //  };
  //  $scope.returnFilePath = function () {
  //     console.log("File path ", $scope.filepath)
  //  }


     //When the page has loaded, run this code

       // prevent default behavior from changing page on dropped file
      //  $window.ondragover = function(e) { e.preventDefault(); return false };
      //  $window.ondrop = function(e) { e.preventDefault(); return false };

       var holder = document.getElementById('holder');
       holder.ondragover = function () { this.className = 'hover'; return false; };
       holder.ondragleave = function () { this.className = ''; return false; };
       holder.ondrop = function (e) {
         e.preventDefault();

         for (var i = 0; i < e.dataTransfer.files.length; ++i) {
           console.log(e.dataTransfer.files[i].path);
         }
         return false;
       };



});
