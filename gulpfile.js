"use strict";

/*  Dependencies
======================================================= */
var 	gulp 					= require("gulp"),
			tsc 					= require('gulp-typescript'),
			livereload 		= require('gulp-livereload'),
			sourcemaps 		= require('gulp-sourcemaps'),
			concat 				= require('gulp-concat'),
			nodemon 			= require('gulp-nodemon'),
			gulpTypings 	= require('gulp-typings'),
			sass 					= require('gulp-sass'),
			del 					= require('del'),
			tslint 				= require('tslint'),
			browserSync 	= require('browser-sync').create(),
			reload				= browserSync.reload;

/*  Variables
======================================================= */
var tsProject 		= tsc.createProject('tsconfig.json'),
		tsClient 			= tsc.createProject('client/tsconfig.json'),
		tsServer 			= tsc.createProject('server/tsconfig.json');

/*  Constants
======================================================= */
var BROWSER_SYNC_RELOAD_DELAY = 500;


/*  [TASK] DEFAULT
======================================================= */
gulp.task('default', ['serve'], function () {
	gulp.watch("client/assets/scss/**/*.scss", ['scss']);
	gulp.watch("client/**/*.html",['html-reload']);
	gulp.watch("client/**/*.js",['js-reload']);
	gulp.watch("client/**/*.ts", ['ts-client-watch']);
	gulp.watch("server/**/*.ts", ['ts-server-watch']);
});

/*  [TASK] BUILD
======================================================= */
gulp.task('build', ['clean-sync','ts-client','ts-server','html','scss','js']);

/*  [TASK] CLEAN
======================================================= */
gulp.task('clean',(cb) => {
	return del(['dist'],cb);
});

// Use del.sync which completes the del and then returns from the task
gulp.task('clean-sync',function(){
	del.sync(['dist']);
})

/*  [TASK] CLIENT TYPESCRIPT
======================================================= */
gulp.task('ts-client', function(){
	return gulp
		.src('client/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(tsc(tsClient))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/client'))
});

gulp.task('ts-client-watch', ['ts-client'], function(done){
	browserSync.reload();
	done();
});

/*  [TASK] SERVER TYPESCRIPT
======================================================= */

gulp.task('ts-server', function(){
	return gulp
		.src('server/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(tsc(tsServer))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/server'))
	// var tsProject = tsc.createProject('server/tsconfig.json');
	// var tsResult = gulp.src('server/**/*.ts')
	// 	.pipe(sourcemaps.init())
	// 	.pipe(tsc(tsProject))
	// return tsResult.js
	// 	.pipe(sourcemaps.write())
	// 	.pipe(gulp.dest('dist/server'))
});

gulp.task('ts-server-watch', ['ts-server'], function(done){
	browserSync.reload();
	done();
});

/*  [TASK] CLIENT JAVASCRIPT
======================================================= */
gulp.task('js',function(){
	gulp.src('client/**/*.js')
	.pipe(gulp.dest('dist/client'))
});

gulp.task('js-reload', ['js'], function(done){
	browserSync.reload();
	done();
});


gulp.task('scss',function(){
	return gulp.src('client/assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('dist/client/assets/css'))
		.pipe(browserSync.stream());
});

gulp.task('html',function(){
	gulp.src('client/**/*.html')
	.pipe(gulp.dest('dist/client'))
});

gulp.task('html-reload', ['html'], function(done){
	browserSync.reload();
	done();
});


gulp.task('serve',['nodemon'], function() {

    browserSync.init({
        proxy: "http://localhost:8080",
				open: false
    });

});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script:'dist/server/server.js'
	}).on('start',function(){
			if(!started){
				cb();
				started = true;
			}
		})
			.on('restart',function onRestart(){
				// reload connected browsers after a slight delay
				setTimeout(function reload(){
					browserSync.reload();
				}, BROWSER_SYNC_RELOAD_DELAY);
			});
});
