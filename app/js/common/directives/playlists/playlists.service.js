angApp.factory('playlistService', function($rootScope) {
  var sharedService = {};

  sharedService.message = '';

  sharedService.prepForBroadcast = function(msg) {
    this.message = msg;
    this.broadcastItem();
  };

  sharedService.prepForState = function() {
    this.broadcastState();
  }

  sharedService.broadcastState = function() {
    $rootScope.$broadcast('handleState');
  }

  sharedService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return sharedService;
});
