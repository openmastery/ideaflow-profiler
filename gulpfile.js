var gulp = require('gulp');

var PATHS = {
  src: 'src/**/*.ts'
};

gulp.task('transpile', function () {
  var typescript = require('gulp-typescript');
  var tsConfig = require('./tsconfig.json');
  
  var tsResult = gulp
    .src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
    .pipe(typescript(tsConfig.compilerOptions));
  
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['transpile'], function () {
  var http = require('http');
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var open = require('open');

  var port = 9000, app;

  app = connect().use(serveStatic(__dirname));
  http.createServer(app).listen(port, function () {
    open('http://localhost:' + port);
  });
});
