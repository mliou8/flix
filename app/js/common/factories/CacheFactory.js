'use strict';
var loki = require('lokijs'),
	path = require('path'),
	Promise = require('bluebird'),
	omdb = Promise.promisifyAll(require('omdb'));


angApp.factory('Storage', function($rootScope) {
	function findOmdb(name) {
		console.log('in omdb function', name);
		return omdb.searchAsync(name)
			.then(function(results) {
				if (results.length < 1) return;
				if (results.length >= 1) {
					return omdb.getAsync(results[0].imdb);
				}
			})
	};
	//Not being used anymore
	function addMedia(mediaTitle) {
		var self = this;
		console.log(self);
		return new Promise(function(resolve, reject) {
			console.log(self);
			findOmdb(mediaTitle)
				.then(function(metadata) {
					var media = {};
					media = metadata;
					media._id = metadata.imdb.id;
					self.collection.insert(media);
					console.log(media);
					self.db.saveDatabase();
				})
				.then(function() {
					resolve(self);
				}, function(err) {
					reject(err);
				});
		})
	};

	return {
		db: new loki(path.resolve(__dirname, 'app.db')),
		collection: null,
		loaded: false,
		init: function() {
			var self = this;
			self.db.loadDatabase({}, function() {
				return new Promise(function(resolve, reject) {
						if (self.db.collections.length) {
							self.collection = self.db.getCollection('media');
							self.loaded = true;
							return resolve(self);
						} else {
							self.db.addCollection('media');
							self.db.saveDatabase();
							self.collection = self.db.getCollection('media');
							self.loaded = true;
							return resolve(self)
						}
					})
					.then(function() {
						console.log('in the factory', self);
						$rootScope.$emit('dbLoaded');
					})
					.then(null, function(err) {
						console.log(err)
					})
					// .catch(function(err) {
					// 	console.log(err);
					// })
			})
		},
		findMedia: function(mediaId) {
			var self = this;
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					return resolve(self.collection.find({
						"_id": mediaId
					}));
				} else {
					reject(new Error('db is not ready'));
				}
			})
		},
		//not being used either
		addMedia: addMedia,
		findOrCreate: function(mediaTitle, seasons) {
			var self = this;
			console.log('in the findOrCreate')
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					findOmdb(mediaTitle)
						.then(function(metadata) {
							if (self.collection.find({
									'_id': metadata.imdb.id
								}).length > 0) {
								console.log(self.collection.find({
									'title': mediaTitle
								}).length);
								//Still need to return actual file
								return resolve(null);
							} else {
								console.log('creating');
								var media = {};
								media = metadata;
								media._id = metadata.imdb.id;
								media.seasons = seasons;
								self.collection.insert(media);
								console.log(media);
								self.db.saveDatabase();
								resolve(self);
							}
						})
				} else {
					reject(new Error('db is not ready'));
				}
			});
		},
		updateTimestamp: function(mediaTitle, season, episode, newTimestamp) {
			return new Promise(function(resolve, reject) {
					if (self.loaded && self.db.getCollection('media')) {
						findOmdb(mediaTitle)
							.then(function(metadata) {
									if (self.collection.find({
											'_id': metadata.imdb.id
										})) {
										var updating = self.collection.findOne({
											'_id': metadata.imdb.id
										})
										updating.seasons[season][episode].timestamp = newTimestamp;
										resolve(self.collection.update(updating));
									} else {
										reject(new Error('media not found'));
									}
							})
						}
					})
			}
	};
});
