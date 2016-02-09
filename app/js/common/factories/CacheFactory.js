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
								console.log(self.db);
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
			var self = this;
			console.log('ip address', link);
			$http.get(link + '/catalog')
				.then(function(catalog) {
					console.log('catalog',catalog);
					var catalogToSave = _.forEach(catalog.data, function(item) {
						if (item.type === 'movie') {
							console.log(item);
							item.remote = true;
							item.path = link + '/allFiles/' + item._id + '/';
						} else {
							for (var key in item.seasons) {
								item.seasons[key].forEach(function(episode) {
									console.log(episode);
									episode.remote = true;
									episode.path = link + '/allFiles/' + item._id + '/' + key + '/' + episode.num;
								})
							}
						}
					})
					return catalogToSave;
				})
				.then(function(catalogToSave) {
					console.log('catalog to save', catalogToSave)
					return _.forEach(catalogToSave, function(mediaObj) {
						delete mediaObj.$loki
						delete mediaObj.meta
						console.log(mediaObj);
						if (self.db.getCollection('media').find({
								'_id': mediaObj._id
							}).length) {
								console.log('in updating', mediaObj)
							var media = self.db.getCollection('media').findOne({
								'_id': mediaObj._id
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
							//Still need to return actual file
						} else {
							console.log('in creating', mediaObj);
							var media = {};
							media = mediaObj;
							media._id = mediaObj._id;
							if (media.type === 'series') media.seasons = mediaObj.seasons;
							if (media.type === 'movie') media.path = mediaObj.path;
							console.log('collections', self.db.collections);
							console.log('media to insert', media);
							self.db.getCollection('media').insert(media);
							console.log('media to insert', media);
							self.db.saveDatabase();
						}
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
