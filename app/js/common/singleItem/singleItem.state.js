angApp.config(function($stateProvider){
  $stateProvider.state('singleItemState', {
    url: '/singleItem',
    templateUrl: './app/js/common/singleItem/singleItem.html',
    controller: 'singleItemCtrl'
  })
})
