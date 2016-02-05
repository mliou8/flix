angApp.controller('SingleItemCtrl', function($rootScope, $scope, singleMedia, $state){
  $scope.mediaData = singleMedia;
  console.log(singleMedia)
  if(singleMedia.type === 'series'){
    $scope.seasons = [];
    for(var key in singleMedia.seasons){
      $scope.seasons.push(singleMedia.seasons[key])
    }
    console.log($scope.seasons)
  }
})
