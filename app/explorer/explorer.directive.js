var _ = require('lodash');
// 
// app.directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 return _.map(changeEvent.target.files, function(file){
//                   scope.fileread = [];
//                   var reader = new FileReader();
//                   reader.onload = function (loadEvent) {
//                       scope.$apply(function () {
//                           scope.fileread.push(loadEvent.target.result);
//                       });
//                   }
//                   reader.readAsDataURL(file);
//                 });
//             });
//         }
//     }
// }]);
