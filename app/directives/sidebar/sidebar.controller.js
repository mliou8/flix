app.controller('SidebarCtrl', function($scope) {
  $scope.menuActive = false;
  //
  var wrapper = document.getElementById('sidebar-wrapper')
  $scope.toggleMenu = function(e) {
    // wrapper.toggleClass("toggled");
    $scope.menuActive = !$scope.menuActive;
  }



})
