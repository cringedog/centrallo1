var gulp = require( 'gulp' ),
	sass = require( 'gulp-sass' ),
	concatCSS = require( 'gulp-concat-css' ),
	autoprefixer = require( 'gulp-autoprefixer'),
	concat = require( 'gulp-concat' ),
	cssnano = require( 'gulp-cssnano' ),
	rename = require( 'gulp-rename' ),
	clean = require( 'gulp-clean' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	uglify = require( 'gulp-uglify' ),
	wiredep = require( 'gulp-wiredep' ),
	useref = require( 'gulp-useref' ),
	browserSync = require( 'browser-sync' ),
    gulpif = require('gulp-if'),
	notify = require( 'gulp-notify'),
	spritesmith = require('gulp.spritesmith');
 
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/assets/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    padding: 60
  }));
  return spriteData.pipe(gulp.dest('app/css/sass/misc'));
});


gulp.task( 'default' , function(){
	console.log( 'gulp is love' );
	console.log( 'gulp is life' );
});

gulp.task( 'watch', ['server', 'styles', 'html'], function() {
	gulp.watch( 'app/css/**/*.scss' , [ 'styles' ]);
	gulp.watch ( 'app/*.html' , [ 'html' ]);
});

gulp.task( 'html', function(){
	return gulp.src( 'app/*.html')
		//.pipe(gulp.dest( 'dist' ))
		.pipe(browserSync.stream());
});

gulp.task( 'styles' , function(){
	return gulp.src( 'app/css/sass/**/*.scss' )
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: [ 'last 3 versions' ]
		}))
		.pipe(concat( 'styles.css' ))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename( 'main.css' ))
		.pipe(gulp.dest( 'app/css' ))
        .pipe(browserSync.stream());
});

gulp.task('server', function () {
	browserSync({
	port: 9000,
	server: {
		baseDir:'app'
		}
	});
});

gulp.task('wiredep_task', function(){
	gulp.src('app/*.html')
		.pipe( wiredep({
			ignorePath: /^(\.\.\/)*\.\./
		}) )
		.pipe(gulp.dest('./app'));
})

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});