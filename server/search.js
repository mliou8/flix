var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var glob = require("glob")

// var walk    = require('walk')
// var walker  = walk.walk("/tmp", { followLinks: false })
console.log("SUP")

function parse (fileName){
    var quality = /\d{3,4}p/;
    var season = /[Ss](\d{1,2})/;
    var episode = /[Ee](\d{1,2})/;
    var title = /[^SE(\d{1,2})]*/

    var obj = {};

    obj.quality = fileName.match(quality).shift();
    obj.title = fileName.match(title).shift().split('.');
    obj.title = obj.title.splice(0, obj.title.length-1).join(" ")
    obj.season = fileName.match(season).shift() || 'no season';
    console.log(obj.title)
    obj.episode = fileName.match(episode).shift() || 'no episode';
    return obj;
}
// options is optional
glob("**/*.mkv", {cwd: '/Users/mliou' }, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  var shows = []
  files.forEach(function (data) {
  	var string = data.split('/')[1];
  	var show = parse(string);
  	show.filePath = data;
  	shows.push(show);
  })
  console.log(shows);
  return shows;
})


// Rick.and.Morty.S02E01.720p.WEB-DL.x264.AC3-nopan.mkv



// //Set up a walk through function
// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       console.log("Entering file")
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };

// walk(process.env.HOME, function(err, results) {
//   if (err) throw err;
//   console.log(results);
// });
