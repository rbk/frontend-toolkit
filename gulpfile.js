/*

WORK IN PROGRESS

gulp live reload
gulp minify script
gulp minify css
gulp babel
gulp compass
gulp compass sass


npm install gulp --save-dev
npm install gulp-compass --save-dev
npm install gulp-minify-css --save-dev
npm install gulp-livereload --save-dev
npm install gulp-sass --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-postcss --sav-dev
npm install cssnano --sav-dev
npm install gulp-watch --save-dev
npm install autoprefixer --save-dev
npm install postcss-scss --save-dev
npm install babel-preset-es2015 --save-dev
npm install webpack --save-dev
npm install webpack-dev-server --save-dev
npm install pump --save-dev
npm install postcss-cssnext --save-dev

 */

var gulp 					= require('gulp'),
		compass 			= require('gulp-compass'),
		livereload 		= require('gulp-livereload'),
		watch 				= require('gulp-watch'),
		gulpPostcss 	= require('gulp-postcss'),
		postcss       = require('postcss-scss'),
		cssnano 			= require('gulp-cssnano'),
		uglify 				= require('gulp-uglify'),
		pump					= require('pump');


// required default
gulp.task('default', function() { /* Some default task */ });


// compile sass with compass plugin since this project used compass initially
gulp.task('compass', function() {
  gulp.src('./sass/application.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./css'));
});

// Watch the task so we don't have to go back to the command line after every change
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./sass/*.scss', ['compass']);
  // gulp.watch('./js/*.js', ['uglify']);
});

// compress javascript
gulp.task('uglify', function(cb) {  
  pump([
        gulp.src('./js/*.js'),
        uglify(),
        gulp.dest('./js/dist')
    ],
    cb
  );
});

//gulp.task('css', function () {
//    var processors = [
//        autoprefixer({browsers: ['last 1 version']}),
//        cssnano(),
//    ];
//    return gulp.src('./src/*.css')
//        .pipe(postcss(processors))
//        .pipe(gulp.dest('./dest'));
//});

// gulp.task('watch', function() {
//   livereload.listen();
//   gulp.watch('./sass/*.scss', ['sass']);
// });



