angApp.config(function($stateProvider){
  $stateProvider.state('dashboardState', {
<<<<<<< HEAD
    url: '/',
    templateUrl: './app/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      show: function(Cache) {
        return Cache.getAll();
      }
    }
=======
    url: '/test',
    templateUrl: './app/dashboard/dashboard.html'
>>>>>>> master
  })
})
