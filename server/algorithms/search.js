// var fs = require('fs');
// var path = require('path');
// var find = require('findit');
// var parseVideo = require('video-name-parser');
// // var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
// // var arg = process.argv[2];
// // var finder = find(homedir);
//
// // finder.setFinder = function (address) {
// //   finder = find(address);
// // }
//
// //Set up variables to find user's homedir
// finder.vidExtensions = ['mkv', 'avi', 'mov', 'gifv', 'flv']
//
// finder.soln = [];
//
// finder.on('path', function (file, stat) {
//    var showString = file.split('/');
//   //  console.log("showString ", showString);
//    var temp = showString[showString.length - 1].split(".");
//   //  console.log(temp);
//    if (this.vidExtensions.indexOf(temp[temp.length - 1]) !== -1) {
//      this.soln.push(parseVideo(file));
//    }
//    console.log("Thank you for your patience!");
// });
//
// finder.on('end', function (file, stat) {
//   console.log('soln', soln)
// })
//
// module.exports=finder;
//
//
// //RIP Glob
// // var moviePaths = ["**/*.mkv", "**/*.avi", "**/*.mp4",
// // "**/*.264", "**/*.mov", "**/*.dv4", "**/*.dvr", "**/*.flv", "**/*.gifv"];
//
// // function filePathJoin (fileName) {
// // 	var fileName = fileName.split('/').slice(0, -1).join('/');
// // 	var finalFile = path.join(fileName);
// // 	return finalFile;
// // }
// // // var str = 'TV Shows/app/home/the.great.british.bake.off.s06e01.cake.720p.hdtv.x264-c4tv.mkv';
// // // filePathJoin(str);
//
// // glob(moviePaths, {cwd: homedir }, function (er, files) {
// //   // files is an array of filenames.
// //   // If the `nonull` option is set, and nothing
// //   // was found, then files is ["**/*.js"]
// //   // er is an error object or null.
// //   var shows = []
// //   files.forEach(function (data) {
// //   	var showString = data.split('/')[1];
// //   	// var showString = parseTV(showString);
// //   	//Saves standardized filepath
// //   	showString.filePath = filePathJoin(data);
// //   	shows.push(data);
// //   })
// //   console.log("shows ", shows)
// //   return shows;
// // })
// // Rick.and.Morty.S02E01.720p.WEB-DL.x264.AC3-nopan.mkv
//
// //RIP Native implementation
// // //Set up a walk through function
// // var walk = function(dir, done) {
// //   var results = [];
// //   fs.readdir(dir, function(err, list) {
// //     if (err) return done(err);
// //     var pending = list.length;
// //     if (!pending) return done(null, results);
// //     list.forEach(function(file) {
// //       console.log("Entering file")
// //       file = path.resolve(dir, file);
// //       fs.stat(file, function(err, stat) {
// //         if (stat && stat.isDirectory()) {
// //           walk(file, function(err, res) {
// //             results = results.concat(res);
// //             if (!--pending) done(null, results);
// //           });
// //         } else {
// //           results.push(file);
// //           if (!--pending) done(null, results);
// //         }
// //       });
// //     });
// //   });
// // };
//
// // walk(process.env.HOME, function(err, results) {
// //   if (err) throw err;
// //   console.log(results);
// // });
