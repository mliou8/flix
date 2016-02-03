angApp.config(function($stateProvider) {
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/js/explorer/explorer.html',
    controller: 'ExplorerCtrl'
  })
})
