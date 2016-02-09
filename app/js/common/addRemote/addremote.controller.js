angApp.controller('AddRemoteCtrl', function($rootScope, $state, $scope, Storage) {
  $scope.ipAddress = 'http://192.168.2.89:3000'

  $scope.getRemote = function() {
    console.log($scope.ipAddress);
    Storage.getRemote($scope.ipAddress);
    $state.go('dashboardState')
  };
})
