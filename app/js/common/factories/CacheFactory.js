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
	//Not being used anymore
	function addMedia(mediaTitle) {
		var self = this;
		return new Promise(function(resolve, reject) {
			findOmdb(mediaTitle)
				.then(function(metadata) {
					var media = {};
					media = metadata;
					media._id = metadata.imdb.id;
					self.collection.insert(media);
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
		findAllMedia: function() {
			var self = this;
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					return resolve(self.collection.find({}))
				} else {
					reject(new Error('hahahaha'));
				}
			})
		},
		//not being used either
		addMedia: addMedia,
		findOrCreate: function(mediaObj) {
			var self = this;
			console.log('in the findOrCreate', mediaObj)
			return new Promise(function(resolve, reject) {
				if (self.loaded && self.db.getCollection('media')) {
					findOmdb(mediaObj)
						.then(function(metadata) {
							if (self.collection.find({
									'_id': metadata.imdb.id
								}).length > 0) {
									var media = self.collection.findOne({'_id': metadata.imdb.id})
									console.log('this is series',media.type, media.title)
									if(media.type === 'series'){
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
								console.log('creating');
								var media = {};
								media = metadata;
								media._id = metadata.imdb.id;
								media.seasons = mediaObj.seasons;
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
