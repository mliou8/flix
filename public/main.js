'use strict';

var app = angular.module('main', ['ui.router', 'ngFileUpload']);

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});

app.controller('DashboardCtrl', function ($scope) {
  //code
  console.log('inside DashboardCtrl');
});

app.config(function ($stateProvider) {
  $stateProvider.state('dashboardState', {
    url: '/test',
    templateUrl: './app/dashboard/dashboard.html'
  });
});

var _ = require('lodash');
//
// app.directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 return _.map(changeEvent.target.files, function(file){
//                   scope.fileread = [];
//                   var reader = new FileReader();
//                   reader.onload = function (loadEvent) {
//                       scope.$apply(function () {
//                           scope.fileread.push(loadEvent.target.result);
//                       });
//                   }
//                   reader.readAsDataURL(file);
//                 });
//             });
//         }
//     }
// }]);

var exec = require('child_process').exec;
var shell = require('electron').shell;
var homedir = process.platform === 'win32' ? process.env.HOMEPATH : process.env.HOME;

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
  holder.ondragover = function () {
    this.className = 'hover';return false;
  };
  holder.ondragleave = function () {
    this.className = '';return false;
  };
  holder.ondrop = function (e) {
    e.preventDefault();

    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      console.log(e.dataTransfer.files[i].path);
    }
    return false;
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/explorer/explorer.html',
    controller: 'Explorer'
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuc3RhdGUuanMiLCJleHBsb3Jlci9leHBsb3Jlci5kaXJlY3RpdmUuanMiLCJleHBsb3Jlci9leHBsb3Jlci5qcyIsImV4cGxvcmVyL2V4cGxvcmVyLnN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxHQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQTtBQUNBLG9CQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQ0pBLEdBQUEsQ0FBQSxVQUFBLENBQUEsZUFBQSxFQUFBLFVBQUEsTUFBQSxFQUFBOztBQUVBLFNBQUEsQ0FBQSxHQUFBLENBQUEsc0JBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQ0hBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBLEtBQUEsQ0FBQSxnQkFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLE9BQUE7QUFDQSxlQUFBLEVBQUEsZ0NBQUE7R0FDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDTEEsSUFBQSxDQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUNBLElBQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLEtBQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQSxNQUFBLE1BQUEsR0FBQSxRQUFBLENBQUEsY0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUEsR0FBQSxZQUFBO0FBQUEsUUFBQSxDQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsT0FBQSxLQUFBLENBQUE7R0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFdBQUEsR0FBQSxZQUFBO0FBQUEsUUFBQSxDQUFBLFNBQUEsR0FBQSxFQUFBLENBQUEsT0FBQSxLQUFBLENBQUE7R0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLE1BQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUNBLEtBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0EsYUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtLQUNBO0FBQ0EsV0FBQSxLQUFBLENBQUE7R0FDQSxDQUFBO0NBSUEsQ0FBQSxDQUFBOztBQ2pEQSxHQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxLQUFBLENBQUEsZUFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLEdBQUE7QUFDQSxlQUFBLEVBQUEsOEJBQUE7QUFDQSxjQUFBLEVBQUEsVUFBQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdtYWluJywgWyd1aS5yb3V0ZXInLCAnbmdGaWxlVXBsb2FkJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pXG4iLCJhcHAuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gIC8vY29kZVxuICBjb25zb2xlLmxvZygnaW5zaWRlIERhc2hib2FyZEN0cmwnKVxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGFzaGJvYXJkU3RhdGUnLCB7XG4gICAgdXJsOiAnL3Rlc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJ1xuICB9KVxufSlcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG4vLyBcbi8vIGFwcC5kaXJlY3RpdmUoXCJmaWxlcmVhZFwiLCBbZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHNjb3BlOiB7XG4vLyAgICAgICAgICAgICBmaWxlcmVhZDogXCI9XCJcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4vLyAgICAgICAgICAgICBlbGVtZW50LmJpbmQoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGNoYW5nZUV2ZW50KSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGNoYW5nZUV2ZW50LnRhcmdldC5maWxlcywgZnVuY3Rpb24oZmlsZSl7XG4vLyAgICAgICAgICAgICAgICAgICBzY29wZS5maWxlcmVhZCA9IFtdO1xuLy8gICAgICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4vLyAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGxvYWRFdmVudCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmZpbGVyZWFkLnB1c2gobG9hZEV2ZW50LnRhcmdldC5yZXN1bHQpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1dKTtcbiIsImNvbnN0IGV4ZWMgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJykuZXhlY1xuY29uc3Qgc2hlbGwgPSByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsO1xudmFyIGhvbWVkaXIgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykgPyBwcm9jZXNzLmVudi5IT01FUEFUSCA6IHByb2Nlc3MuZW52LkhPTUU7XG5cbmFwcC5jb250cm9sbGVyKCdFeHBsb3JlcicsIGZ1bmN0aW9uICgkc2NvcGUsIFVwbG9hZCwgJHRpbWVvdXQpIHtcbiAgLy9FdmVyZXR0IGFuZCBTaGFmaXEncyBcIkdsYWNrXCIgY29kZSB0aGF0IHBpY2tzIHVwXG4gIC8vIGEgZmlsZSBwYXRoLlxuICAvLyAgdmFyIGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob2xkZXInKTtcbiAgLy8gIGhvbGRlci5vbmRyYWdvdmVyID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgIHJldHVybiBmYWxzZTtcbiAgLy8gIH07XG4gIC8vICBob2xkZXIub25kcmFnbGVhdmUgPSBob2xkZXIub25kcmFnZW5kID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgIHJldHVybiBmYWxzZTtcbiAgLy8gIH07XG4gIC8vICBob2xkZXIub25kcm9wID0gZnVuY3Rpb24oZSkge1xuICAvLyAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcbiAgLy8gICAgdmFyIGZpbGUgPSBlLmRhdGFUcmFuc2Zlci5maWxlc1swXTtcbiAgLy8gICAgJHNjb3BlLmZpbGVQYXRoID0gZmlsZS5wYXRoXG4gIC8vICAgIGNvbnNvbGUubG9nKCdGaWxlIHlvdSBkcmFnZ2VkIGhlcmUgaXMnLCBmaWxlLnBhdGgpO1xuICAvLyAgICAkc2NvcGUudXBsb2FkRmlsZVBhdGggPSBmaWxlLnBhdGguc3Vic3RyaW5nKDEpXG4gIC8vICAgICRzY29wZS4kZGlnZXN0KClcbiAgLy8gICAgcmV0dXJuIGZhbHNlO1xuICAvLyAgfTtcbiAgLy8gICRzY29wZS5yZXR1cm5GaWxlUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiRmlsZSBwYXRoIFwiLCAkc2NvcGUuZmlsZXBhdGgpXG4gIC8vICB9XG5cblxuICAgICAvL1doZW4gdGhlIHBhZ2UgaGFzIGxvYWRlZCwgcnVuIHRoaXMgY29kZVxuXG4gICAgICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW9yIGZyb20gY2hhbmdpbmcgcGFnZSBvbiBkcm9wcGVkIGZpbGVcbiAgICAgIC8vICAkd2luZG93Lm9uZHJhZ292ZXIgPSBmdW5jdGlvbihlKSB7IGUucHJldmVudERlZmF1bHQoKTsgcmV0dXJuIGZhbHNlIH07XG4gICAgICAvLyAgJHdpbmRvdy5vbmRyb3AgPSBmdW5jdGlvbihlKSB7IGUucHJldmVudERlZmF1bHQoKTsgcmV0dXJuIGZhbHNlIH07XG5cbiAgICAgICB2YXIgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGRlcicpO1xuICAgICAgIGhvbGRlci5vbmRyYWdvdmVyID0gZnVuY3Rpb24gKCkgeyB0aGlzLmNsYXNzTmFtZSA9ICdob3Zlcic7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICBob2xkZXIub25kcmFnbGVhdmUgPSBmdW5jdGlvbiAoKSB7IHRoaXMuY2xhc3NOYW1lID0gJyc7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICBob2xkZXIub25kcm9wID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRhdGFUcmFuc2Zlci5maWxlc1tpXS5wYXRoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICB9O1xuXG5cblxufSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2V4cGxvcmVyU3RhdGUnLCB7XG4gICAgdXJsOiAnLycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9leHBsb3Jlci9leHBsb3Jlci5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRXhwbG9yZXInXG4gIH0pXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
