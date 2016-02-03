'use strict';

var app = angular.module('main', ['ui.router']);

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

app.controller('Explorer', function ($scope, $element, vidConstants) {
  // Code to make the 'file holder div' take in
  // file path names
  var homedir = process.platform === 'win32' ? process.env.HOMEPATH : process.env.HOME;
  var shell = require('electron').shell;
  // var finder = require('./server/algorithms/search.js')
  var fs = require('fs');
  var path = require('path');
  var find = require('findit');
  var parseVideo = require('video-name-parser');

  //Button called "browse", opens homedirectory of user
  $scope.openHome = function () {
    return shell.showItemInFolder(homedir);
  };

  // --------------------------
  // Code that allows you to recurse through the directories
  //provided and return file names that end with certain exts

  var holder = document.getElementById('fileholder');
  holder.ondragover = function () {
    this.className = 'hover';
    return false;
  };
  holder.ondragleave = function () {
    this.className = '';
    return false;
  };
  holder.ondrop = function (e) {
    var dataPathArray = [];
    var soln = [];
    e.preventDefault();
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      dataPathArray.push(e.dataTransfer.files[i].path);
    }
    dataPathArray.forEach(function (data) {
      var finder = find(data);
      finder.on('file', function (file, stat) {
        if (vidConstants.vidExtensions.indexOf(path.extname(file)) !== -1) {
          var parsed = parseVideo(file);
          soln.push(parsed);
        }
        console.log("Thank you for your patience!");
      });
      finder.on('end', function (file, stat) {
        // soln.forEach()
        console.log('soln', soln);
      });
    });
    return false;
  };
});

app.factory('vidConstants', function () {
  return {
    vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv']
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/explorer/explorer.html',
    controller: 'Explorer'
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuc3RhdGUuanMiLCJleHBsb3Jlci9leHBsb3Jlci5qcyIsImV4cGxvcmVyL2V4cGxvcmVyLnN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxrQkFBQSxFQUFBO0FBQ0Esb0JBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDSkEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7O0FBRUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxzQkFBQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDSEEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGdCQUFBLEVBQUE7QUFDQSxPQUFBLEVBQUEsT0FBQTtBQUNBLGVBQUEsRUFBQSxnQ0FBQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNMQSxHQUFBLENBQUEsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBOzs7QUFHQSxNQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxLQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsR0FDQSxPQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLE1BQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxLQUFBLENBQUE7O0FBRUEsTUFBQSxFQUFBLEdBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLG1CQUFBLENBQUEsQ0FBQTs7O0FBR0EsUUFBQSxDQUFBLFFBQUEsR0FBQSxZQUFBO0FBQ0EsV0FBQSxLQUFBLENBQUEsZ0JBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtHQUNBLENBQUE7Ozs7OztBQU1BLE1BQUEsTUFBQSxHQUFBLFFBQUEsQ0FBQSxjQUFBLENBQUEsWUFBQSxDQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSxRQUFBLENBQUEsU0FBQSxHQUFBLE9BQUEsQ0FBQTtBQUNBLFdBQUEsS0FBQSxDQUFBO0dBQ0EsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxXQUFBLEdBQUEsWUFBQTtBQUNBLFFBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0EsV0FBQSxLQUFBLENBQUE7R0FDQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLE1BQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUNBLFFBQUEsYUFBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBLFFBQUEsSUFBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBLEtBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQTtBQUNBLFNBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtLQUNBO0FBQ0EsaUJBQUEsQ0FBQSxPQUFBLENBQUEsVUFBQSxJQUFBLEVBQUE7QUFDQSxVQUFBLE1BQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQSxZQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsRUFBQSxVQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxZQUFBLFlBQUEsQ0FBQSxhQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FDQSxDQUFBLENBQUEsRUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7U0FDQTtBQUNBLGVBQUEsQ0FBQSxHQUFBLENBQUEsOEJBQUEsQ0FBQSxDQUFBO09BQ0EsQ0FBQSxDQUFBO0FBQ0EsWUFBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLEVBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBOztBQUVBLGVBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO09BQ0EsQ0FBQSxDQUFBO0tBQ0EsQ0FBQSxDQUFBO0FBQ0EsV0FBQSxLQUFBLENBQUE7R0FDQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQUdBLEdBQUEsQ0FBQSxPQUFBLENBQUEsY0FBQSxFQUFBLFlBQUE7QUFDQSxTQUFBO0FBQ0EsaUJBQUEsRUFBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLENBQUE7R0FDQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQzdEQSxHQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxLQUFBLENBQUEsZUFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLEdBQUE7QUFDQSxlQUFBLEVBQUEsOEJBQUE7QUFDQSxjQUFBLEVBQUEsVUFBQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdtYWluJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgLy9jb2RlXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgRGFzaGJvYXJkQ3RybCcpXG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkYXNoYm9hcmRTdGF0ZScsIHtcbiAgICB1cmw6ICcvdGVzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmh0bWwnXG4gIH0pXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0V4cGxvcmVyJywgZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgdmlkQ29uc3RhbnRzKSB7XG4gIC8vIENvZGUgdG8gbWFrZSB0aGUgJ2ZpbGUgaG9sZGVyIGRpdicgdGFrZSBpblxuICAvLyBmaWxlIHBhdGggbmFtZXNcbiAgdmFyIGhvbWVkaXIgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykgPyBwcm9jZXNzLmVudi5IT01FUEFUSCA6XG4gICAgcHJvY2Vzcy5lbnYuSE9NRTtcbiAgY29uc3Qgc2hlbGwgPSByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsO1xuICAvLyB2YXIgZmluZGVyID0gcmVxdWlyZSgnLi9zZXJ2ZXIvYWxnb3JpdGhtcy9zZWFyY2guanMnKVxuICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgdmFyIGZpbmQgPSByZXF1aXJlKCdmaW5kaXQnKTtcbiAgdmFyIHBhcnNlVmlkZW8gPSByZXF1aXJlKCd2aWRlby1uYW1lLXBhcnNlcicpO1xuXG4gIC8vQnV0dG9uIGNhbGxlZCBcImJyb3dzZVwiLCBvcGVucyBob21lZGlyZWN0b3J5IG9mIHVzZXJcbiAgJHNjb3BlLm9wZW5Ib21lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNoZWxsLnNob3dJdGVtSW5Gb2xkZXIoaG9tZWRpcik7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb2RlIHRoYXQgYWxsb3dzIHlvdSB0byByZWN1cnNlIHRocm91Z2ggdGhlIGRpcmVjdG9yaWVzXG4gIC8vcHJvdmlkZWQgYW5kIHJldHVybiBmaWxlIG5hbWVzIHRoYXQgZW5kIHdpdGggY2VydGFpbiBleHRzXG5cbiAgdmFyIGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlaG9sZGVyJyk7XG4gIGhvbGRlci5vbmRyYWdvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnaG92ZXInO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgaG9sZGVyLm9uZHJhZ2xlYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGhvbGRlci5vbmRyb3AgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGRhdGFQYXRoQXJyYXkgPSBbXTtcbiAgICB2YXIgc29sbiA9IFtdO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBkYXRhUGF0aEFycmF5LnB1c2goZS5kYXRhVHJhbnNmZXIuZmlsZXNbaV0ucGF0aCk7XG4gICAgfVxuICAgIGRhdGFQYXRoQXJyYXkuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgZmluZGVyID0gZmluZChkYXRhKTtcbiAgICAgIGZpbmRlci5vbignZmlsZScsIGZ1bmN0aW9uKGZpbGUsIHN0YXQpIHtcbiAgICAgICAgaWYgKHZpZENvbnN0YW50cy52aWRFeHRlbnNpb25zLmluZGV4T2YocGF0aC5leHRuYW1lKGZpbGUpKSAhPT1cbiAgICAgICAgICAtMSkge1xuICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVZpZGVvKGZpbGUpO1xuICAgICAgICAgIHNvbG4ucHVzaChwYXJzZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhhbmsgeW91IGZvciB5b3VyIHBhdGllbmNlIVwiKTtcbiAgICAgIH0pXG4gICAgICBmaW5kZXIub24oJ2VuZCcsIGZ1bmN0aW9uKGZpbGUsIHN0YXQpIHtcbiAgICAgICAgLy8gc29sbi5mb3JFYWNoKClcbiAgICAgICAgY29uc29sZS5sb2coJ3NvbG4nLCBzb2xuKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbn0pO1xuXG5cbmFwcC5mYWN0b3J5KCd2aWRDb25zdGFudHMnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB2aWRFeHRlbnNpb25zOiBbJy5ta3YnLCAnLmF2aScsICcubW92JywgJy5naWZ2JywgJy5mbHYnXVxuICB9XG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdleHBsb3JlclN0YXRlJywge1xuICAgIHVybDogJy8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvZXhwbG9yZXIvZXhwbG9yZXIuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0V4cGxvcmVyJ1xuICB9KVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
