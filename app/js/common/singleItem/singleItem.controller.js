angApp.controller('SingleItemCtrl', function($rootScope, $scope, singleMedia){
  $scope.mediaData = singleMedia;
  console.log($scope.mediaData)
})
