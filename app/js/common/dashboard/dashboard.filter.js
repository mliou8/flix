angApp.filter('playlist', ['segmentio', function(segmentio) {
  return function(entry, category) {
    segmentio.track(entry, category);
  }
}]);
