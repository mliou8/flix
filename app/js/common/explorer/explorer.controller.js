angApp.controller('ExplorerCtrl', function($scope, $element, vidConstants,
	Storage, $rootScope, $state) {
	// Code to make the 'file holder div' take in
	// file path names

	var homedir = (process.platform === 'win32') ? process.env.HOMEPATH :
		process.env.HOME;
	const shell = require('electron').shell;
	// var finder = require('./server/algorithms/search.js')
	var fs = require('fs');
	var path = require('path');
	var find = require('findit');
	var parseVideo = require('video-name-parser');
	var _ = require('lodash');
	var Promise = require('bluebird')
	var $ = require('jquery');

	//Button called "browse", opens homedirectory of user
	$scope.openHome = function() {
		return shell.showItemInFolder(homedir);
	}

	// --------------------------
	// Code that allows you to recurse through the directories
	//provided and return file names that end with certain exts

	var holder = document.getElementById('fileholder');
	holder.ondragover = function() {
		this.className = 'hover';
		return false;
	};
	holder.ondragleave = function() {
		this.className = '';
		return false;
	};
	holder.ondrop = function(e) {
		var dataPathArray = [];
		var soln = [];
		e.preventDefault();
		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			dataPathArray.push(e.dataTransfer.files[i].path);
		}
		dataPathArray.forEach(function(data) {
			var finder = find(data);
			finder.on('file', function(file, stat) {
				var mediaName = file.split("/").pop()
				if (vidConstants.vidExtensions.indexOf(path.extname(file)) !==
					-1) {
					var parsed = parseVideo(mediaName);
					parsed.filePath = file
					soln.push(parsed);
				}
			})
			finder.on('end', function(file, stat) {
				var mediaArr = [];
				soln.forEach(function(eachFile) {
					var matchingItem = _.find(mediaArr, {
						terms: eachFile.name
					});
					if (eachFile.type === 'series') {
						if (matchingItem) {
							if (!matchingItem.seasons[eachFile.season]) matchingItem.seasons[
								eachFile.season] = [{
								num: eachFile.episode[0],
								path: eachFile.filePath,
								timestamp: 0
							}]
							else matchingItem.seasons[eachFile.season].push({
								num: eachFile.episode[0],
								path: eachFile.filePath,
								timestamp: 0
							})
						} else {
							var mediaObj = {
								terms: eachFile.name,
								year: eachFile.year,
								seasons: {}
							}
							mediaObj.seasons[eachFile.season] = [];
							mediaObj.seasons[eachFile.season].push({
								num: eachFile.episode[0],
								path: eachFile.filePath,
								timestamp: 0
							})
							mediaArr.push(mediaObj);
						}
					} else {
						var mediaObj = {
							terms: eachFile.name,
							year: eachFile.year,
							path: eachFile.filePath
						}
						mediaArr.push(mediaObj);
					}
				});
				Promise.all(mediaArr.map(function(eachRecord) {
						return Storage.findOrCreate(eachRecord)
					}))
					.then(function() {
						$('#library').addClass("active").siblings().removeClass("active");
						$state.go('dashboardState')
					})
			})
		})
		return false;
	};
});


angApp.factory('vidConstants', function() {
	return {
		vidExtensions: ['.mkv', '.avi', '.mov', '.gifv', '.flv', '.mp4']
	}
})
