angApp.controller('SingleItemCtrl', function($rootScope, $scope, singleMedia, $state){
  $scope.mediaData = singleMedia;
  console.log($scope.mediaData)
  if(singleMedia.type === 'series'){
    $scope.series = singleMedia.type
    $scope.seasons = [];
    for(var key in singleMedia.seasons){
      $scope.seasons.push(singleMedia.seasons[key])
    }
  }
})
