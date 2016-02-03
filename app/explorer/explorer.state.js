angApp.config(function($stateProvider){
  $stateProvider.state('explorerState', {
    url: '/',
    templateUrl: './app/explorer/explorer.html',
    controller: 'ExplorerCtrl'
  })
})
