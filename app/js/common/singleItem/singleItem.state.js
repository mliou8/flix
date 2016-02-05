angApp.config(function($stateProvider){
  $stateProvider.state('singleItemState', {
    url: '/singleItem/:mediaId',
    templateUrl: './app/js/common/singleItem/singleItem.html',
    controller: 'SingleItemCtrl',
    resolve: {
      singleMedia: function(Storage, $stateParams){
        return Storage.findMedia($stateParams.mediaId)
        .then(function(mediaData){
          console.log('this is the mediaData',mediaData[0])
          return mediaData[0]
        });
      }
    }
  })
})
