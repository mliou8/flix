angApp.controller('AddRemoteCtrl', function($rootScope, $state, $scope, Storage) {

  $scope.getRemote = function(ip) {
    Storage.getRemote(ip);
    $state.go('dashboardState')
  };
})
