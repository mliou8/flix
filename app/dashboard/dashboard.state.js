angApp.config(function($stateProvider){
  $stateProvider.state('dashboardState', {
    url: '/',
    templateUrl: './app/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      initialize: function(Storage) {
        return Storage.init();
      }
    }
  })
})
