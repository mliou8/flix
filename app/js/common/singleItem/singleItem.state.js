angApp.config(function($stateProvider){
  $stateProvider.state('singleItemState', {
    url: '/singleItem/:mediaId',
    templateUrl: './app/js/common/singleItem/singleItem.html',
    controller: 'SingleItemCtrl',
    resolve: {
      singleMedia: function(Storage, $stateParams){
        return Storage.db.getCollection("media").findOne({_id:$stateParams.mediaId})
      }
    }
  })
})
