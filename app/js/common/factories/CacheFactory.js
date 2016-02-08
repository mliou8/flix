'use strict';
var loki = require('lokijs'),
	path = require('path'),
	Promise = require('bluebird'),
	omdb = Promise.promisifyAll(require('omdb')),
	_ = require('lodash');

angApp.factory('Storage', function($rootScope, $http) {
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
		},
		getRemote: function(link) {
			$http.get(link + '/catalog')
				.then(function(catalog) {
					var catalogToSave = _.map(catalog, function(item) {
						if (item.type === 'movie') {
							item.remote = true;
							episode.route = link + '/allFiles/' + item._id + '/';
						} else {
							for (var key in item.seasons) {
								item.seasons[key].forEach(function(episode) {
									episode.remote = true;
									episode.route = link + '/allFiles/' + item._id + '/' + key + '/' + episode.num;
								})
							}
						}
					})
					return catalogToSave;
				})
				.then(function(catalogToSave) {
					return catalogToSave.forEach(function(item) {
						this.findOrCreate(item);
					})
				})
		},
		createPlaylist: function(playlist) {
			var self = this;
			if (self.loaded && self.db.getCollection('playlists')) {
				var tempPlaylist = {};
				tempPlaylist.name = playlist.name;
				tempPlaylist.media = playlist.media;
				self.db.getCollection('playlists').insert(tempPlaylist);
				console.log(tempPlaylist);
				self.db.saveDatabase();
			} else {
				reject(new Error('db is not ready'));
			}
		},
		findAllPlaylists: function() {
			var self = this;
			return self.db.getCollection('playlists').data;
		},
		updatePlaylist: function(playlist, media) {
			var self = this;
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('playlists')) {
					var dbPlaylist = self.db.getCollection('playlists').find({
						'name': playlist
					})
					console.log("playlist in factory is ", dbPlaylist)
				}
				return resolve(dbPlaylist)
			}).then(function(playlist) {
				console.log("success ", playlist);
				playlist[0].media.push(media)
				self.db.saveDatabase();
			})
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
		}
	}
});
