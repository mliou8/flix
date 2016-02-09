angApp.directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: './app/js/common/directives/sidebar/sidebar.html',
    link: function(scope, element, attributes){
      var $ = require('jquery');
      	$(".sidebarButton").click(function(){
      	    $(this).addClass("active").siblings().removeClass("active");
      	});



    }
  };
});
