angApp.config(function($stateProvider){
  $stateProvider.state('dashboardState', {
    url: '/dashboard',
    templateUrl: './app/js/common/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
})
