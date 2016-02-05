angApp.config(function($stateProvider){
  $stateProvider.state('dashboardState', {
    url: '/dashboard',
    templateUrl: './app/js/common/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      allMedia: function(Storage){
        return Storage.findAllMedia()
        .then(function(allMedia){
          return allMedia
        });
      }
    }
  })
})
