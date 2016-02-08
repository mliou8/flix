angApp.config(function($stateProvider) {
  $stateProvider.state('addRemoteState', {
    url: '/addRemote',
    templateUrl: './app/js/common/addRemote/addremote.html',
    controller: 'addRemoteCtrl'
  })
})
