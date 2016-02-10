angApp.controller('PlayerCtrl', function($rootScope, $scope, media, $stateParams){
  $scope.series = media.series;
  if ($stateParams.path[0]==='/') $scope.filePath = 'file:///'+$stateParams.path;
  else $scope.filePath = $stateParams.path
})
