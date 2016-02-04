'use strict';

var angApp = angular.module('main', ['ui.router']);

angApp.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});

angApp.controller('DashboardCtrl', function ($rootScope, $scope, Storage, initialize) {
  //code
  $rootScope.$on('dbLoaded', function () {
    console.log('initialized', Storage.findOrCreate('Rick and Morty').then(function (result) {
      return console.log(result);
    }));
    // .then(function(result) {console.log(result)});
  });
});

angApp.config(function ($stateProvider) {
  $stateProvider.state('dashboardState', {
    url: '/',
    templateUrl: './app/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      initialize: function initialize(Storage) {
        return Storage.init();
      }
    }
  });
});

angApp.controller('ExplorerCtrl', function ($scope, $element, vidConstants) {
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

angApp.factory('vidConstants', function () {
  return {
    vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv']
  };
});

angApp.config(function ($stateProvider) {
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/explorer/explorer.html',
    controller: 'ExplorerCtrl'
  });
});

angApp.controller('DashboardCtrl', function ($rootScope, $scope, Storage, initialize) {});

angApp.config(function ($stateProvider) {
  $stateProvider.state('dashboardState', {
    url: '/dashboard',
    templateUrl: './app/js/common/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
});

angApp.controller('ExplorerCtrl', function ($scope, $element, vidConstants, Storage, initialize, $rootScope) {
  // Code to make the 'file holder div' take in
  // file path names

  // $rootScope.$on('dbLoaded', function() {
  //   console.log('initialized', Storage.findOrCreate(soln.name).then(result=> console.log(result)));
  //   // .then(function(result) {console.log(result)});
  // })

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
          parsed.filePath = file;
          soln.push(parsed);
        }
        console.log("Thank you for your patience!");
      });
      finder.on('end', function (file, stat) {

        soln.forEach(function (eachFile) {
          var mediaObj = { title: eachFile.name, year: eachFile.year, season: eachFile.season, episode: eachFile.episode };
          Storage.findOrCreate(mediaObj).then(function (result) {
            return console.log(result);
          });
        });
        console.log('soln', soln);
      });
    });
    return false;
  };
});

angApp.factory('vidConstants', function () {
  return {
    vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv']
  };
});

angApp.config(function ($stateProvider) {
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/js/common/explorer/explorer.html',
    controller: 'ExplorerCtrl',
    resolve: {
      initialize: function initialize(Storage) {
        return Storage.init();
      }
    }
  });
});

angApp.controller('PlayerCtrl', function ($rootScope, $scope) {
  console.log('hitting the player controller');
});

angApp.config(function ($stateProvider) {
  $stateProvider.state('playerState', {
    url: '/player',
    templateUrl: './app/js/common/player/player.html',
    controller: 'PlayerCtrl'
  });
});

angApp.controller('SingleItemCtrl', function ($rootScope, $scope) {
  console.log('hitting the single item controller');
});

angApp.config(function ($stateProvider) {
  $stateProvider.state('singleItemState', {
    url: '/singleItem',
    templateUrl: './app/js/common/singleItem/singleItem.html',
    controller: 'singleItemCtrl'
  });
});

'use strict';
var loki = require('lokijs'),
    path = require('path'),
    Promise = require('bluebird'),
    omdb = Promise.promisifyAll(require('omdb'));

angApp.factory('Storage', function ($rootScope) {
  function findOmdb(name) {
    console.log('in omdb function', name);
    return omdb.searchAsync(name).then(function (results) {
      if (results.length < 1) return;
      if (results.length >= 1) {
        return omdb.getAsync(results[0].imdb);
      }
    });
  };
  function addMedia(mediaTitle) {
    var self = this;
    console.log(self);
    return new Promise(function (resolve, reject) {
      console.log(self);
      findOmdb(mediaTitle).then(function (metadata) {
        var media = {};
        media = metadata;
        media._id = metadata.imdb.id;
        self.collection.insert(media);
        console.log(media);
        self.db.saveDatabase();
      }).then(function () {
        resolve(self);
      }, function (err) {
        reject(err);
      });
    });
  };

  return {
    db: new loki(path.resolve(__dirname, 'app.db')),
    collection: null,
    loaded: false,
    init: function init() {
      var self = this;
      self.db.loadDatabase({}, function () {
        return new Promise(function (resolve, reject) {
          if (self.db.collections.length) {
            self.collection = self.db.getCollection('media');
            self.loaded = true;
            return resolve(self);
          } else {
            self.db.addCollection('media');
            self.db.saveDatabase();
            self.collection = self.db.getCollection('media');
            self.loaded = true;
            return resolve(self);
          }
        }).then(function () {
          console.log('in the factory', self);
          $rootScope.$emit('dbLoaded');
        }).then(null, function (err) {
          console.log(err);
        });
        // .catch(function(err) {
        // 	console.log(err);
        // })
      });
    },
    findMedia: function findMedia(mediaId) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (self.loaded && self.db.getCollection('media')) {
          return resolve(self.collection.find({ "_id": mediaId }));
        } else {
          reject(new Error('db is not ready'));
        }
      });
    },
    addMedia: addMedia,
    findOrCreate: function findOrCreate(mediaTitle) {
      var self = this;
      console.log('in the findOrCreate');
      return new Promise(function (resolve, reject) {
        if (self.loaded && self.db.getCollection('media')) {
          findOmdb(mediaTitle).then(function (metadata) {
            if (self.collection.find({ '_id': metadata.imdb.id }).length > 0) {
              console.log(self.collection.find({ 'title': mediaTitle }).length);
              return resolve(null);
            } else {
              console.log('creating');
              var media = {};
              media = metadata;
              media._id = metadata.imdb.id;
              self.collection.insert(media);
              console.log(media);
              self.db.saveDatabase();
              resolve(self);
            }
          });
        } else {
          reject(new Error('db is not ready'));
        }
      });
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQuc3RhdGUuanMiLCJleHBsb3Jlci9leHBsb3Jlci5jb250cm9sbGVyLmpzIiwiZXhwbG9yZXIvZXhwbG9yZXIuc3RhdGUuanMiLCJqcy9jb21tb24vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwianMvY29tbW9uL2Rhc2hib2FyZC9kYXNoYm9hcmQuc3RhdGUuanMiLCJqcy9jb21tb24vZXhwbG9yZXIvZXhwbG9yZXIuY29udHJvbGxlci5qcyIsImpzL2NvbW1vbi9leHBsb3Jlci9leHBsb3Jlci5zdGF0ZS5qcyIsImpzL2NvbW1vbi9wbGF5ZXIvcGxheWVyLmNvbnRyb2xsZXIuanMiLCJqcy9jb21tb24vcGxheWVyL3BsYXllci5zdGF0ZS5qcyIsImpzL2NvbW1vbi9zaW5nbGVJdGVtL3NpbmdsZUl0ZW0uY29udHJvbGxlci5qcyIsImpzL2NvbW1vbi9zaW5nbGVJdGVtL3NpbmdsZUl0ZW0uc3RhdGUuanMiLCJqcy9jb21tb24vZmFjdG9yaWVzL0NhY2hlRmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxNQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQTtBQUNBLG9CQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQ0pBLE1BQUEsQ0FBQSxVQUFBLENBQUEsZUFBQSxFQUFBLFVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBOztBQUVBLFlBQUEsQ0FBQSxHQUFBLENBQUEsVUFBQSxFQUFBLFlBQUE7QUFDQSxXQUFBLENBQUEsR0FBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsWUFBQSxDQUFBLGdCQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxNQUFBO2FBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUE7S0FBQSxDQUFBLENBQUEsQ0FBQTs7R0FFQSxDQUFBLENBQUE7Q0FFQSxDQUFBLENBQUE7O0FDUEEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGdCQUFBLEVBQUE7QUFDQSxPQUFBLEVBQUEsR0FBQTtBQUNBLGVBQUEsRUFBQSxnQ0FBQTtBQUNBLGNBQUEsRUFBQSxlQUFBO0FBQ0EsV0FBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxvQkFBQSxPQUFBLEVBQUE7QUFDQSxlQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQTtPQUNBO0tBQ0E7R0FDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDWEEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxjQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQTs7O0FBR0EsTUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsS0FBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBLEdBQ0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxNQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBOztBQUVBLE1BQUEsRUFBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUE7OztBQUdBLFFBQUEsQ0FBQSxRQUFBLEdBQUEsWUFBQTtBQUNBLFdBQUEsS0FBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7R0FDQSxDQUFBOzs7Ozs7QUFNQSxNQUFBLE1BQUEsR0FBQSxRQUFBLENBQUEsY0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUEsR0FBQSxZQUFBO0FBQ0EsUUFBQSxDQUFBLFNBQUEsR0FBQSxPQUFBLENBQUE7QUFDQSxXQUFBLEtBQUEsQ0FBQTtHQUNBLENBQUE7QUFDQSxRQUFBLENBQUEsV0FBQSxHQUFBLFlBQUE7QUFDQSxRQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBLFdBQUEsS0FBQSxDQUFBO0dBQ0EsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxNQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUE7QUFDQSxRQUFBLGFBQUEsR0FBQSxFQUFBLENBQUE7QUFDQSxRQUFBLElBQUEsR0FBQSxFQUFBLENBQUE7QUFDQSxLQUFBLENBQUEsY0FBQSxFQUFBLENBQUE7QUFDQSxTQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0EsbUJBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7S0FDQTtBQUNBLGlCQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsSUFBQSxFQUFBO0FBQ0EsVUFBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0EsWUFBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsVUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsWUFBQSxZQUFBLENBQUEsYUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQ0EsQ0FBQSxDQUFBLEVBQUE7QUFDQSxjQUFBLE1BQUEsR0FBQSxVQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQSxjQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO1NBQ0E7QUFDQSxlQUFBLENBQUEsR0FBQSxDQUFBLDhCQUFBLENBQUEsQ0FBQTtPQUNBLENBQUEsQ0FBQTtBQUNBLFlBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxFQUFBLFVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTs7QUFFQSxlQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtPQUNBLENBQUEsQ0FBQTtLQUNBLENBQUEsQ0FBQTtBQUNBLFdBQUEsS0FBQSxDQUFBO0dBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUFHQSxNQUFBLENBQUEsT0FBQSxDQUFBLGNBQUEsRUFBQSxZQUFBO0FBQ0EsU0FBQTtBQUNBLGlCQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxDQUFBO0dBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUM3REEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGVBQUEsRUFBQTtBQUNBLE9BQUEsRUFBQSxHQUFBO0FBQ0EsZUFBQSxFQUFBLDhCQUFBO0FBQ0EsY0FBQSxFQUFBLGNBQUE7R0FDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDTkEsTUFBQSxDQUFBLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQSxVQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsRUFDQSxDQUFBLENBQUE7O0FDREEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGdCQUFBLEVBQUE7QUFDQSxPQUFBLEVBQUEsWUFBQTtBQUNBLGVBQUEsRUFBQSwwQ0FBQTtBQUNBLGNBQUEsRUFBQSxlQUFBO0dBQ0EsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQ05BLE1BQUEsQ0FBQSxVQUFBLENBQUEsY0FBQSxFQUFBLFVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxVQUFBLEVBQUE7Ozs7Ozs7OztBQVNBLE1BQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLEtBQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsUUFBQSxHQUNBLE9BQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0EsTUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQTs7QUFFQSxNQUFBLEVBQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7QUFDQSxNQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBOzs7QUFHQSxRQUFBLENBQUEsUUFBQSxHQUFBLFlBQUE7QUFDQSxXQUFBLEtBQUEsQ0FBQSxnQkFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO0dBQ0EsQ0FBQTs7Ozs7O0FBTUEsTUFBQSxNQUFBLEdBQUEsUUFBQSxDQUFBLGNBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxVQUFBLEdBQUEsWUFBQTtBQUNBLFFBQUEsQ0FBQSxTQUFBLEdBQUEsT0FBQSxDQUFBO0FBQ0EsV0FBQSxLQUFBLENBQUE7R0FDQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFdBQUEsR0FBQSxZQUFBO0FBQ0EsUUFBQSxDQUFBLFNBQUEsR0FBQSxFQUFBLENBQUE7QUFDQSxXQUFBLEtBQUEsQ0FBQTtHQUNBLENBQUE7QUFDQSxRQUFBLENBQUEsTUFBQSxHQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQ0EsUUFBQSxhQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0EsUUFBQSxJQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0EsS0FBQSxDQUFBLGNBQUEsRUFBQSxDQUFBO0FBQ0EsU0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxFQUFBLENBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0tBQ0E7QUFDQSxpQkFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLElBQUEsRUFBQTtBQUNBLFVBQUEsTUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLFlBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxFQUFBLFVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLFlBQUEsWUFBQSxDQUFBLGFBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxLQUNBLENBQUEsQ0FBQSxFQUFBO0FBQ0EsY0FBQSxNQUFBLEdBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxRQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0EsY0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtTQUNBO0FBQ0EsZUFBQSxDQUFBLEdBQUEsQ0FBQSw4QkFBQSxDQUFBLENBQUE7T0FDQSxDQUFBLENBQUE7QUFDQSxZQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsRUFBQSxVQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7O0FBRUEsWUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLFFBQUEsRUFBQTtBQUNBLGNBQUEsUUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQTtBQUNBLGlCQUFBLENBQUEsWUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLE1BQUE7bUJBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUE7V0FBQSxDQUFBLENBQUE7U0FDQSxDQUFBLENBQUE7QUFDQSxlQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtPQUNBLENBQUEsQ0FBQTtLQUNBLENBQUEsQ0FBQTtBQUNBLFdBQUEsS0FBQSxDQUFBO0dBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUFHQSxNQUFBLENBQUEsT0FBQSxDQUFBLGNBQUEsRUFBQSxZQUFBO0FBQ0EsU0FBQTtBQUNBLGlCQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxDQUFBO0dBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUN4RUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGVBQUEsRUFBQTtBQUNBLE9BQUEsRUFBQSxHQUFBO0FBQ0EsZUFBQSxFQUFBLHdDQUFBO0FBQ0EsY0FBQSxFQUFBLGNBQUE7QUFDQSxXQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLG9CQUFBLE9BQUEsRUFBQTtBQUNBLGVBQUEsT0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBO09BQ0E7S0FDQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNYQSxNQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBLFVBQUEsRUFBQSxNQUFBLEVBQUE7QUFDQSxTQUFBLENBQUEsR0FBQSxDQUFBLCtCQUFBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNGQSxNQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxLQUFBLENBQUEsYUFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLFNBQUE7QUFDQSxlQUFBLEVBQUEsb0NBQUE7QUFDQSxjQUFBLEVBQUEsWUFBQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNOQSxNQUFBLENBQUEsVUFBQSxDQUFBLGdCQUFBLEVBQUEsVUFBQSxVQUFBLEVBQUEsTUFBQSxFQUFBO0FBQ0EsU0FBQSxDQUFBLEdBQUEsQ0FBQSxvQ0FBQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDRkEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLGlCQUFBLEVBQUE7QUFDQSxPQUFBLEVBQUEsYUFBQTtBQUNBLGVBQUEsRUFBQSw0Q0FBQTtBQUNBLGNBQUEsRUFBQSxnQkFBQTtHQUNBLENBQUEsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNOQSxZQUFBLENBQUE7QUFDQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBO0lBQ0EsSUFBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUE7SUFDQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTtJQUNBLElBQUEsR0FBQSxPQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBOztBQUdBLE1BQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsVUFBQSxFQUFBO0FBQ0EsV0FBQSxRQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0EsV0FBQSxDQUFBLEdBQUEsQ0FBQSxrQkFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0EsV0FBQSxJQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUNBLElBQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQTtBQUNBLFVBQUEsT0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsT0FBQTtBQUNBLFVBQUEsT0FBQSxDQUFBLE1BQUEsSUFBQSxDQUFBLEVBQUE7QUFDQSxlQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO09BQ0E7S0FDQSxDQUFBLENBQUE7R0FDQSxDQUFBO0FBQ0EsV0FBQSxRQUFBLENBQUEsVUFBQSxFQUFBO0FBQ0EsUUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0EsV0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLFdBQUEsSUFBQSxPQUFBLENBQUEsVUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQ0EsYUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FBQSxVQUFBLENBQUEsQ0FDQSxJQUFBLENBQUEsVUFBQSxRQUFBLEVBQUE7QUFDQSxZQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7QUFDQSxhQUFBLEdBQUEsUUFBQSxDQUFBO0FBQ0EsYUFBQSxDQUFBLEdBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUNBLFlBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQ0EsZUFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQTtBQUNBLFlBQUEsQ0FBQSxFQUFBLENBQUEsWUFBQSxFQUFBLENBQUE7T0FDQSxDQUFBLENBQ0EsSUFBQSxDQUFBLFlBQUE7QUFDQSxlQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7T0FDQSxFQUFBLFVBQUEsR0FBQSxFQUFBO0FBQ0EsY0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO09BQ0EsQ0FBQSxDQUFBO0tBQ0EsQ0FBQSxDQUFBO0dBQ0EsQ0FBQTs7QUFFQSxTQUFBO0FBQ0EsTUFBQSxFQUFBLElBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0EsY0FBQSxFQUFBLElBQUE7QUFDQSxVQUFBLEVBQUEsS0FBQTtBQUNBLFFBQUEsRUFBQSxnQkFBQTtBQUNBLFVBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTtBQUNBLFVBQUEsQ0FBQSxFQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQSxZQUFBO0FBQ0EsZUFBQSxJQUFBLE9BQUEsQ0FBQSxVQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFDQSxjQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLE1BQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsVUFBQSxHQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxNQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0EsbUJBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1dBQ0EsTUFBQTtBQUNBLGdCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtBQUNBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxVQUFBLEdBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7QUFDQSxnQkFBQSxDQUFBLE1BQUEsR0FBQSxJQUFBLENBQUE7QUFDQSxtQkFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7V0FDQTtTQUNBLENBQUEsQ0FDQSxJQUFBLENBQUEsWUFBQTtBQUNBLGlCQUFBLENBQUEsR0FBQSxDQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7QUFDQSxvQkFBQSxDQUFBLEtBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTtTQUNBLENBQUEsQ0FDQSxJQUFBLENBQUEsSUFBQSxFQUFBLFVBQUEsR0FBQSxFQUFBO0FBQ0EsaUJBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7U0FDQSxDQUFBLENBQUE7Ozs7T0FJQSxDQUFBLENBQUE7S0FDQTtBQUNBLGFBQUEsRUFBQSxtQkFBQSxPQUFBLEVBQUE7QUFDQSxVQUFBLElBQUEsR0FBQSxJQUFBLENBQUE7QUFDQSxhQUFBLElBQUEsT0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtBQUNBLFlBQUEsSUFBQSxDQUFBLE1BQUEsSUFBQSxJQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxPQUFBLENBQUEsRUFBQTtBQUNBLGlCQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7U0FDQSxNQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsQ0FBQTtTQUNBO09BQ0EsQ0FBQSxDQUFBO0tBQ0E7QUFDQSxZQUFBLEVBQUEsUUFBQTtBQUNBLGdCQUFBLEVBQUEsc0JBQUEsVUFBQSxFQUFBO0FBQ0EsVUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0EsYUFBQSxDQUFBLEdBQUEsQ0FBQSxxQkFBQSxDQUFBLENBQUE7QUFDQSxhQUFBLElBQUEsT0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtBQUNBLFlBQUEsSUFBQSxDQUFBLE1BQUEsSUFBQSxJQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxPQUFBLENBQUEsRUFBQTtBQUNBLGtCQUFBLENBQUEsVUFBQSxDQUFBLENBQ0EsSUFBQSxDQUFBLFVBQUEsUUFBQSxFQUFBO0FBQ0EsZ0JBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7QUFDQSxxQkFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0EscUJBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQTtBQUNBLHFCQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO0FBQ0Esa0JBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBLG1CQUFBLEdBQUEsUUFBQSxDQUFBO0FBQ0EsbUJBQUEsQ0FBQSxHQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUE7QUFDQSxrQkFBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7QUFDQSxxQkFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQTtBQUNBLGtCQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBO0FBQ0EscUJBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTthQUNBO1dBQ0EsQ0FBQSxDQUFBO1NBQ0EsTUFBQTtBQUNBLGdCQUFBLENBQUEsSUFBQSxLQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUE7U0FDQTtPQUNBLENBQUEsQ0FBQTtLQUNBO0dBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFuZ0FwcCA9IGFuZ3VsYXIubW9kdWxlKCdtYWluJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFuZ0FwcC5jb25maWcoZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pXG4iLCJhbmdBcHAuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgU3RvcmFnZSwgaW5pdGlhbGl6ZSl7XG4gIC8vY29kZVxuICAkcm9vdFNjb3BlLiRvbignZGJMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZWQnLCBTdG9yYWdlLmZpbmRPckNyZWF0ZSgnUmljayBhbmQgTW9ydHknKS50aGVuKHJlc3VsdD0+IGNvbnNvbGUubG9nKHJlc3VsdCkpKTtcbiAgICAvLyAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtjb25zb2xlLmxvZyhyZXN1bHQpfSk7XG4gIH0pXG5cbn0pXG4iLCJhbmdBcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Rhc2hib2FyZFN0YXRlJywge1xuICAgIHVybDogJy8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgcmVzb2x2ZToge1xuICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gU3RvcmFnZS5pbml0KCk7XG4gICAgICB9XG4gICAgfVxuICB9KVxufSlcbiIsImFuZ0FwcC5jb250cm9sbGVyKCdFeHBsb3JlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCB2aWRDb25zdGFudHMpIHtcbiAgLy8gQ29kZSB0byBtYWtlIHRoZSAnZmlsZSBob2xkZXIgZGl2JyB0YWtlIGluXG4gIC8vIGZpbGUgcGF0aCBuYW1lc1xuICB2YXIgaG9tZWRpciA9IChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSA/IHByb2Nlc3MuZW52LkhPTUVQQVRIIDpcbiAgICBwcm9jZXNzLmVudi5IT01FO1xuICBjb25zdCBzaGVsbCA9IHJlcXVpcmUoJ2VsZWN0cm9uJykuc2hlbGw7XG4gIC8vIHZhciBmaW5kZXIgPSByZXF1aXJlKCcuL3NlcnZlci9hbGdvcml0aG1zL3NlYXJjaC5qcycpXG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICB2YXIgZmluZCA9IHJlcXVpcmUoJ2ZpbmRpdCcpO1xuICB2YXIgcGFyc2VWaWRlbyA9IHJlcXVpcmUoJ3ZpZGVvLW5hbWUtcGFyc2VyJyk7XG5cbiAgLy9CdXR0b24gY2FsbGVkIFwiYnJvd3NlXCIsIG9wZW5zIGhvbWVkaXJlY3Rvcnkgb2YgdXNlclxuICAkc2NvcGUub3BlbkhvbWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2hlbGwuc2hvd0l0ZW1JbkZvbGRlcihob21lZGlyKTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvZGUgdGhhdCBhbGxvd3MgeW91IHRvIHJlY3Vyc2UgdGhyb3VnaCB0aGUgZGlyZWN0b3JpZXNcbiAgLy9wcm92aWRlZCBhbmQgcmV0dXJuIGZpbGUgbmFtZXMgdGhhdCBlbmQgd2l0aCBjZXJ0YWluIGV4dHNcblxuICB2YXIgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVob2xkZXInKTtcbiAgaG9sZGVyLm9uZHJhZ292ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdob3Zlcic7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICBob2xkZXIub25kcmFnbGVhdmUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICcnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgaG9sZGVyLm9uZHJvcCA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZGF0YVBhdGhBcnJheSA9IFtdO1xuICAgIHZhciBzb2xuID0gW107XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGRhdGFQYXRoQXJyYXkucHVzaChlLmRhdGFUcmFuc2Zlci5maWxlc1tpXS5wYXRoKTtcbiAgICB9XG4gICAgZGF0YVBhdGhBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBmaW5kZXIgPSBmaW5kKGRhdGEpO1xuICAgICAgZmluZGVyLm9uKCdmaWxlJywgZnVuY3Rpb24oZmlsZSwgc3RhdCkge1xuICAgICAgICBpZiAodmlkQ29uc3RhbnRzLnZpZEV4dGVuc2lvbnMuaW5kZXhPZihwYXRoLmV4dG5hbWUoZmlsZSkpICE9PVxuICAgICAgICAgIC0xKSB7XG4gICAgICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlVmlkZW8oZmlsZSk7XG4gICAgICAgICAgc29sbi5wdXNoKHBhcnNlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJUaGFuayB5b3UgZm9yIHlvdXIgcGF0aWVuY2UhXCIpO1xuICAgICAgfSlcbiAgICAgIGZpbmRlci5vbignZW5kJywgZnVuY3Rpb24oZmlsZSwgc3RhdCkge1xuICAgICAgICAvLyBzb2xuLmZvckVhY2goKVxuICAgICAgICBjb25zb2xlLmxvZygnc29sbicsIHNvbG4pXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufSk7XG5cblxuYW5nQXBwLmZhY3RvcnkoJ3ZpZENvbnN0YW50cycsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHZpZEV4dGVuc2lvbnM6IFsnLm1rdicsICcuYXZpJywgJy5tb3YnLCAnLmdpZnYnLCAnLmZsdiddXG4gIH1cbn0pXG4iLCJhbmdBcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2V4cGxvcmVyU3RhdGUnLCB7XG4gICAgdXJsOiAnLycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9leHBsb3Jlci9leHBsb3Jlci5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRXhwbG9yZXJDdHJsJ1xuICB9KVxufSlcbiIsImFuZ0FwcC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCBTdG9yYWdlLCBpbml0aWFsaXplKXtcbn0pXG4iLCJhbmdBcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Rhc2hib2FyZFN0YXRlJywge1xuICAgIHVybDogJy9kYXNoYm9hcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvanMvY29tbW9uL2Rhc2hib2FyZC9kYXNoYm9hcmQuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnXG4gIH0pXG59KVxuIiwiYW5nQXBwLmNvbnRyb2xsZXIoJ0V4cGxvcmVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsIHZpZENvbnN0YW50cywgU3RvcmFnZSwgaW5pdGlhbGl6ZSwgJHJvb3RTY29wZSkge1xuICAvLyBDb2RlIHRvIG1ha2UgdGhlICdmaWxlIGhvbGRlciBkaXYnIHRha2UgaW5cbiAgLy8gZmlsZSBwYXRoIG5hbWVzXG5cbiAgLy8gJHJvb3RTY29wZS4kb24oJ2RiTG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgY29uc29sZS5sb2coJ2luaXRpYWxpemVkJywgU3RvcmFnZS5maW5kT3JDcmVhdGUoc29sbi5uYW1lKS50aGVuKHJlc3VsdD0+IGNvbnNvbGUubG9nKHJlc3VsdCkpKTtcbiAgLy8gICAvLyAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtjb25zb2xlLmxvZyhyZXN1bHQpfSk7XG4gIC8vIH0pXG5cbiAgdmFyIGhvbWVkaXIgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykgPyBwcm9jZXNzLmVudi5IT01FUEFUSCA6XG4gICAgcHJvY2Vzcy5lbnYuSE9NRTtcbiAgY29uc3Qgc2hlbGwgPSByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsO1xuICAvLyB2YXIgZmluZGVyID0gcmVxdWlyZSgnLi9zZXJ2ZXIvYWxnb3JpdGhtcy9zZWFyY2guanMnKVxuICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgdmFyIGZpbmQgPSByZXF1aXJlKCdmaW5kaXQnKTtcbiAgdmFyIHBhcnNlVmlkZW8gPSByZXF1aXJlKCd2aWRlby1uYW1lLXBhcnNlcicpO1xuXG4gIC8vQnV0dG9uIGNhbGxlZCBcImJyb3dzZVwiLCBvcGVucyBob21lZGlyZWN0b3J5IG9mIHVzZXJcbiAgJHNjb3BlLm9wZW5Ib21lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNoZWxsLnNob3dJdGVtSW5Gb2xkZXIoaG9tZWRpcik7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb2RlIHRoYXQgYWxsb3dzIHlvdSB0byByZWN1cnNlIHRocm91Z2ggdGhlIGRpcmVjdG9yaWVzXG4gIC8vcHJvdmlkZWQgYW5kIHJldHVybiBmaWxlIG5hbWVzIHRoYXQgZW5kIHdpdGggY2VydGFpbiBleHRzXG5cbiAgdmFyIGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlaG9sZGVyJyk7XG4gIGhvbGRlci5vbmRyYWdvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnaG92ZXInO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgaG9sZGVyLm9uZHJhZ2xlYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGhvbGRlci5vbmRyb3AgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGRhdGFQYXRoQXJyYXkgPSBbXTtcbiAgICB2YXIgc29sbiA9IFtdO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBkYXRhUGF0aEFycmF5LnB1c2goZS5kYXRhVHJhbnNmZXIuZmlsZXNbaV0ucGF0aCk7XG4gICAgfVxuICAgIGRhdGFQYXRoQXJyYXkuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgZmluZGVyID0gZmluZChkYXRhKTtcbiAgICAgIGZpbmRlci5vbignZmlsZScsIGZ1bmN0aW9uKGZpbGUsIHN0YXQpIHtcbiAgICAgICAgaWYgKHZpZENvbnN0YW50cy52aWRFeHRlbnNpb25zLmluZGV4T2YocGF0aC5leHRuYW1lKGZpbGUpKSAhPT1cbiAgICAgICAgICAtMSkge1xuICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVZpZGVvKGZpbGUpO1xuICAgICAgICAgIHBhcnNlZC5maWxlUGF0aCA9IGZpbGVcbiAgICAgICAgICBzb2xuLnB1c2gocGFyc2VkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoYW5rIHlvdSBmb3IgeW91ciBwYXRpZW5jZSFcIik7XG4gICAgICB9KVxuICAgICAgZmluZGVyLm9uKCdlbmQnLCBmdW5jdGlvbihmaWxlLCBzdGF0KSB7XG5cbiAgICAgICAgc29sbi5mb3JFYWNoKGZ1bmN0aW9uKGVhY2hGaWxlKXtcbiAgICAgICAgICB2YXIgbWVkaWFPYmogPSB7dGl0bGU6IGVhY2hGaWxlLm5hbWUsIHllYXI6IGVhY2hGaWxlLnllYXIsIHNlYXNvbjogZWFjaEZpbGUuc2Vhc29uLCBlcGlzb2RlOiBlYWNoRmlsZS5lcGlzb2RlfVxuICAgICAgICAgIFN0b3JhZ2UuZmluZE9yQ3JlYXRlKG1lZGlhT2JqKS50aGVuKHJlc3VsdD0+IGNvbnNvbGUubG9nKHJlc3VsdCkpXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKCdzb2xuJywgc29sbilcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59KTtcblxuXG5hbmdBcHAuZmFjdG9yeSgndmlkQ29uc3RhbnRzJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgdmlkRXh0ZW5zaW9uczogWycubWt2JywgJy5hdmknLCAnLm1vdicsICcuZ2lmdicsICcuZmx2J11cbiAgfVxufSlcbiIsImFuZ0FwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZXhwbG9yZXJTdGF0ZScsIHtcbiAgICB1cmw6ICcvJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2pzL2NvbW1vbi9leHBsb3Jlci9leHBsb3Jlci5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnRXhwbG9yZXJDdHJsJyxcbiAgICByZXNvbHZlOiB7XG4gICAgICBpbml0aWFsaXplOiBmdW5jdGlvbihTdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiBTdG9yYWdlLmluaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59KVxuIiwiYW5nQXBwLmNvbnRyb2xsZXIoJ1BsYXllckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUpe1xuICBjb25zb2xlLmxvZygnaGl0dGluZyB0aGUgcGxheWVyIGNvbnRyb2xsZXInKVxufSlcbiIsImFuZ0FwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncGxheWVyU3RhdGUnLCB7XG4gICAgdXJsOiAnL3BsYXllcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9qcy9jb21tb24vcGxheWVyL3BsYXllci5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnUGxheWVyQ3RybCdcbiAgfSlcbn0pXG4iLCJhbmdBcHAuY29udHJvbGxlcignU2luZ2xlSXRlbUN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUpe1xuICBjb25zb2xlLmxvZygnaGl0dGluZyB0aGUgc2luZ2xlIGl0ZW0gY29udHJvbGxlcicpXG59KVxuIiwiYW5nQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaW5nbGVJdGVtU3RhdGUnLCB7XG4gICAgdXJsOiAnL3NpbmdsZUl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvanMvY29tbW9uL3NpbmdsZUl0ZW0vc2luZ2xlSXRlbS5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnc2luZ2xlSXRlbUN0cmwnXG4gIH0pXG59KVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGxva2kgPSByZXF1aXJlKCdsb2tpanMnKSxcblx0cGF0aCA9IHJlcXVpcmUoJ3BhdGgnKSxcblx0UHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyksXG5cdG9tZGIgPSBQcm9taXNlLnByb21pc2lmeUFsbChyZXF1aXJlKCdvbWRiJykpO1xuXG5cbmFuZ0FwcC5mYWN0b3J5KCdTdG9yYWdlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICBmdW5jdGlvbiBmaW5kT21kYihuYW1lKSB7XG4gIFx0Y29uc29sZS5sb2coJ2luIG9tZGIgZnVuY3Rpb24nLCBuYW1lKTtcbiAgXHRyZXR1cm4gb21kYi5zZWFyY2hBc3luYyhuYW1lKVxuICBcdFx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xuICBcdFx0XHRpZiAocmVzdWx0cy5sZW5ndGggPCAxKSByZXR1cm47XG4gIFx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKSB7XG4gIFx0XHRcdFx0cmV0dXJuIG9tZGIuZ2V0QXN5bmMocmVzdWx0c1swXS5pbWRiKTtcbiAgXHRcdFx0fVxuICBcdFx0fSlcbiAgfTtcbiAgZnVuY3Rpb24gYWRkTWVkaWEobWVkaWFUaXRsZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhzZWxmKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zb2xlLmxvZyhzZWxmKTtcbiAgICAgIGZpbmRPbWRiKG1lZGlhVGl0bGUpXG4gICAgICAudGhlbihmdW5jdGlvbihtZXRhZGF0YSkge1xuICAgICAgICB2YXIgbWVkaWEgPSB7fTtcbiAgICAgICAgbWVkaWEgPSBtZXRhZGF0YTtcbiAgICAgICAgbWVkaWEuX2lkID0gbWV0YWRhdGEuaW1kYi5pZDtcbiAgICAgICAgc2VsZi5jb2xsZWN0aW9uLmluc2VydChtZWRpYSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcbiAgICAgICAgc2VsZi5kYi5zYXZlRGF0YWJhc2UoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShzZWxmKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KVxuICB9O1xuXG5cdHJldHVybiB7XG5cdFx0ZGI6IG5ldyBsb2tpKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdhcHAuZGInKSksXG5cdFx0Y29sbGVjdGlvbjogbnVsbCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0c2VsZi5kYi5sb2FkRGF0YWJhc2Uoe30sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRcdFx0XHRpZiAoc2VsZi5kYi5jb2xsZWN0aW9ucy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5jb2xsZWN0aW9uID0gc2VsZi5kYi5nZXRDb2xsZWN0aW9uKCdtZWRpYScpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLmxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHNlbGYpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5kYi5hZGRDb2xsZWN0aW9uKCdtZWRpYScpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLmRiLnNhdmVEYXRhYmFzZSgpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLmNvbGxlY3Rpb24gPSBzZWxmLmRiLmdldENvbGxlY3Rpb24oJ21lZGlhJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGYubG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoc2VsZilcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2luIHRoZSBmYWN0b3J5Jywgc2VsZik7XG5cdFx0XHRcdFx0XHQkcm9vdFNjb3BlLiRlbWl0KCdkYkxvYWRlZCcpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4obnVsbCwgZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQvLyAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0XHRcdC8vIH0pXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0ZmluZE1lZGlhOiBmdW5jdGlvbihtZWRpYUlkKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRcdGlmIChzZWxmLmxvYWRlZCAmJiBzZWxmLmRiLmdldENvbGxlY3Rpb24oJ21lZGlhJykpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShzZWxmLmNvbGxlY3Rpb24uZmluZCh7XCJfaWRcIjogbWVkaWFJZH0pKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKCdkYiBpcyBub3QgcmVhZHknKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSxcbiAgICBhZGRNZWRpYTogYWRkTWVkaWEsXG4gICAgZmluZE9yQ3JlYXRlOiBmdW5jdGlvbihtZWRpYVRpdGxlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZygnaW4gdGhlIGZpbmRPckNyZWF0ZScpXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChzZWxmLmxvYWRlZCAmJiBzZWxmLmRiLmdldENvbGxlY3Rpb24oJ21lZGlhJykpIHtcbiAgICAgICAgICBmaW5kT21kYihtZWRpYVRpdGxlKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb2xsZWN0aW9uLmZpbmQoeydfaWQnOiBtZXRhZGF0YS5pbWRiLmlkfSkubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5jb2xsZWN0aW9uLmZpbmQoeyd0aXRsZSc6IG1lZGlhVGl0bGV9KS5sZW5ndGgpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGluZycpO1xuICAgICAgICAgICAgICB2YXIgbWVkaWEgPSB7fTtcbiAgICAgICAgICAgICAgbWVkaWEgPSBtZXRhZGF0YTtcbiAgICAgICAgICAgICAgbWVkaWEuX2lkID0gbWV0YWRhdGEuaW1kYi5pZDtcbiAgICAgICAgICAgICAgc2VsZi5jb2xsZWN0aW9uLmluc2VydChtZWRpYSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcbiAgICAgICAgICAgICAgc2VsZi5kYi5zYXZlRGF0YWJhc2UoKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2RiIGlzIG5vdCByZWFkeScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXHR9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
