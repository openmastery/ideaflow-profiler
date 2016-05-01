var gulp = require('gulp');
var del = require('del');

var PATHS = {
  src: 'src/**/*.ts'
};

gulp.task('clean', function () {
  return del(['dist/**/*']);
});
gulp.task('transpile', ['clean'], function () {
  var typescript = require('gulp-typescript');
  var tsConfig = require('./tsconfig.json');
  
  var tsResult = gulp
    .src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
    .pipe(typescript(tsConfig.compilerOptions));
  
  return tsResult.js.pipe(gulp.dest('dist'));
});

function setHeaders (res, path) {
  console.log(path);
  res.setHeader('Content-Type', 'text/html');
}

gulp.task('serve', ['clean'], function () {
  var http = require('http');
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var open = require('open');

  var port = 9000, app;

  app = connect().use(serveStatic(__dirname, {
    setHeaders: setHeaders
  }));
  http.createServer(app).listen(port, function () {
    open('http://localhost:' + port);
  });
});
