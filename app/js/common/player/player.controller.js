angApp.controller('PlayerCtrl', function($rootScope, $scope, media, $stateParams, $state){
  $scope.series = media.series;
  $scope.goHome = function(){
    $state.go('singleItemState', {mediaId: media.imdb.id}, {reload: true})
  }
  if ($stateParams.path[0]==='/') $scope.filePath = 'file:///'+$stateParams.path;
  else $scope.filePath = $stateParams.path
})
