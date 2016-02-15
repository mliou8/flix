angApp.config(function($stateProvider) {
	$stateProvider.state('singleItemState', {
		url: '/singleItem/:mediaId',
		templateUrl: './app/js/common/singleItem/singleItem.html',
		controller: 'SingleItemCtrl',
		resolve: {
			singleMedia: function(Storage, $stateParams, $http) {
				var media = Storage.db.getCollection("media").findOne({
					_id: $stateParams.mediaId
				});
        var backdrop = media.title.replace(/%20/g, " ");
				$http.get("http://api.movies.io/movies/search?q=" + backdrop)
					.then(function(response) {
            media.backdrop = response.data.movies[0].backdrop.urls.original;
						media.trailer = response.data.movies[0].trailer.url;
						media.runtime = response.data.movies[0].runtime;
					})
				return media
			}
		}
	})
})
