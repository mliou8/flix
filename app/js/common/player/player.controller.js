angApp.controller('PlayerCtrl', function($rootScope, $scope, media){
  $scope.filePath;
  $scope.series = media.series;
  if(media.type === 'series'){
    //do some logic
  }else{
    $scope.filePath = media.path;
  }
})
