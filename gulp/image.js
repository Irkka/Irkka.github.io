const responsive = require('gulp-responsive')

module.exports = (gulp, configuration) => {
	gulp.task('images:import', () => {
		gulp.src('assets/images/import/**/*.jpg')
		.pipe(responsive({
			'*.jpg': {
				width: '1280'
			}
		}))
		.pipe(gulp.dest(configuration.directories.images))
	})
}
