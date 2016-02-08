angApp.controller('AddRemoteCtrl', function($rootScope, $state, $scope, Storage) {
  $scope.ipAddress;

  $scope.getRemote = function() {
    console.log($scope.ipAddress);
    Storage.getRemote($scope.ipAddress);
    $state.go('dashboardState')
  };
})
