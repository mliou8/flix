angApp.controller('PlayerCtrl', function($rootScope, $scope, media, $stateParams){
  $scope.series = media.series;
  $scope.filePath = $stateParams.path
})
