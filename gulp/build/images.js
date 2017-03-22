const del = require('del')

// Gulp Plugins
const responsive = require('gulp-responsive'),
	connect = require('gulp-connect')

module.exports = (gulp, configuration) => {
	gulp.task('images', ['images:clean'], () => {
		console.log(`images: Copying image assets from ${configuration.directories.images}`)
		return gulp.src([`${configuration.directories.images}/**/*.jpg`, `!${configuration.directories.images}/import`])
			.pipe(gulp.dest(`${configuration.directories.build}/assets/images`))
			.pipe(connect.reload())
	})

	gulp.task('images:clean', () => {
		console.log(`images: Removing old build files from ${configuration.directories.build}/assets/images`)
		del.sync(`${configuration.directories.build}/assets/images`)
	})

	gulp.task('images:import', () => {
		gulp.src(`${configuration.directories.images}/import/**/*.jpg`)
		.pipe(responsive({
			'*.jpg': {
				width: '1280'
			}
		}))
		.pipe(gulp.dest(configuration.directories.images))
	})

}
