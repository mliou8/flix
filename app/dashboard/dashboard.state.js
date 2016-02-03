angApp.config(function($stateProvider){
  $stateProvider.state('dashboardState', {
    url: '/',
    templateUrl: './app/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      show: function(Cache) {
        return Cache.getAll();
      }
    }
  })
})
