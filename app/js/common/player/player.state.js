angApp.config(function($stateProvider){
  $stateProvider.state('playerState', {
    url: '/player',
    templateUrl: './app/js/common/player/player.html',
    controller: 'PlayerCtrl'
  })
})
