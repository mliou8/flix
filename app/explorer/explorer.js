const exec = require('child_process').exec
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;

app.controller('Explorer', function($scope){
  $scope.command = function () {
  const child = exec('cat *.js bad_file | wc -l',
      (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
  }
  $scope.command();

  console.log('inside Explorer ctrl')
})
