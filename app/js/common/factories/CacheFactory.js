'use strict';
var loki = require('lokijs'),
	path = require('path'),
	Promise = require('bluebird'),
	omdb = Promise.promisifyAll(require('omdb')),
	_ = require('lodash');

angApp.factory('Storage', function($rootScope) {
	function findOmdb(name) {
		return omdb.searchAsync(name)
			.then(function(results) {
				if (results.length < 1) return;
				if (results.length >= 1) {
					return omdb.getAsync(results[0].imdb);
				}
			})
	};
	return {
		db: new loki(path.resolve(__dirname, 'app.db')),
		playlists: null,
		allMedia: null,
		loaded: false,
		init: function() {
			var self = this;
			self.db.loadDatabase({}, function() {
				return new Promise(function(resolve, reject) {
						if (self.db.collections.length) {
							self.allMedia = self.db.getCollection('media');
							self.playlists = self.db.getCollection('playlists')
							self.loaded = true;
							return resolve(self);
						} else {
							self.db.addCollection('media');
							self.db.addCollection('playlists');
							self.db.saveDatabase();
							self.allMedia = self.db.getCollection('media');
							self.playlists = self.db.getCollection('playlists');
							self.loaded = true;
							return resolve(self)
						}
					})
					.then(function() {
						$rootScope.$emit('dbLoaded');
					})
					.catch(function(err) {
						console.log(err);
					})
			})
		},
		findOrCreate: function(mediaObj) {
			var self = this;
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					findOmdb(mediaObj)
						.then(function(metadata) {
							if (self.db.getCollection('media').find({
									'_id': metadata.imdb.id
								}).length > 0) {
								var media = self.db.getCollection('media').findOne({
									'_id': metadata.imdb.id
								})
								if (media.type === 'series') {
									Object.keys(mediaObj.seasons).forEach(function(key) {
										if (media.seasons[key]) {
											media.seasons[key] = _.unionBy(media.seasons[key], mediaObj.seasons[key], 'num');
										} else {
											media.seasons[key] = mediaObj.seasons[key];
										}
									})
								}
								self.db.saveDatabase();
								resolve(self);
								//Still need to return actual file
							} else {
								var media = {};
								media = metadata;
								media._id = metadata.imdb.id;
								if (media.type === 'series') media.seasons = mediaObj.seasons;
								if (media.type === 'movie') media.path = mediaObj.path;
								self.db.getCollection('media').insert(media);
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
		findBackdrop: function(title, $http) {
			console.log("factory", title)
			$http({
				url: "http://api.movies.io/movies/search?q",
				method: "GET",
				params: {
					q: title
				}
			})
		},
		updateTimestamp: function(mediaTitle, season, episode, newTimestamp) {
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					findOmdb(mediaTitle)
						.then(function(metadata) {
							if (self.media.find({
									'_id': metadata.imdb.id
								})) {
								var updating = self.media.findOne({
									'_id': metadata.imdb.id
								})
								updating.seasons[season][episode].timestamp = newTimestamp;
								resolve(self.media.update(updating));
							} else {
								reject(new Error('media not found'));
							}
						})
				}
			})
		}
	};
});
