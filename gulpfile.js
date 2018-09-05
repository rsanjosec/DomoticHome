'use strict'
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const nodemon = require('gulp-nodemon');


// gulp.task('browser-sync', ['nodemon'], function() {
// 	browserSync.init(null, {
// 		proxy: "http://localhost:8081",
//         files: ["public/**/*.*"],
//         browser: "google chrome",
//         port: 7000,
// 	});
// });

// gulp.task('nodemon', function (cb) {	
// 	var started = false;	
// 	return nodemon({
// 		script: 'app.js'
// 	}).on('start', function () {
// 		// to avoid nodemon being started multiple times
// 		// thanks @matthisk
// 		if (!started) {
// 			cb();
// 			started = true; 
// 		} 
// 	});
// });



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("public/stylesheets"));
        //.pipe(browserSync.stream());
});

// Move the javascript files into our /public/javascript folder
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/jquery/dist/jquery.slim.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/popper.js/dist/umd/popper.js', 'node_modules/feather-icons/dist/feather.min.js'])
        .pipe(gulp.dest("public/javascript"))
        //.pipe(browserSync.stream());
});



gulp.task('css', function() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
      .pipe(gulp.dest("public/stylesheets"))
      //.pipe(browserSync.stream());
});



gulp.task('default', ['sass','js','css'], function(){
  //gulp.watch("src/scss/*.scss", ['sass']);
});