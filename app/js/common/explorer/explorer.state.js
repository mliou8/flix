angApp.config(function($stateProvider){
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/js/common/explorer/explorer.html',
    controller: 'ExplorerCtrl',
    resolve: {
      initialize: function(Storage) {
        return Storage.init();
      }
    }
  })
})
