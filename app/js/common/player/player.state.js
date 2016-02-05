angApp.config(function($stateProvider){
  $stateProvider.state('playerState', {
    url: '/player/:data',
    templateUrl: './app/js/common/player/player.html',
    controller: 'PlayerCtrl',
    resolve: {
      media: function($stateParams, Storage){
        return Storage.db.getCollection("media").findOne({_id:$stateParams.data})
      }
    }
  })
})
