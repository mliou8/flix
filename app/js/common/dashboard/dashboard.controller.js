angApp.controller('DashboardCtrl', function($rootScope, $scope, Storage, allMedia){
  $scope.allMedia = allMedia;
  console.log($scope.allMedia)
})
