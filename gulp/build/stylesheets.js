const del = require('del')

// Gulp Plugins
const	stylus = require('gulp-stylus'),
	connect = require('gulp-connect')

module.exports = (gulp, configuration) => {
	gulp.task('stylesheets', ['stylesheets:clean'], () => {
		console.log(`stylesheets: Building Stylus files from ${configuration.directories.stylesheets}/ke.styl`)
		return gulp.src(`${configuration.directories.stylesheets}/ke.styl`)
			.pipe(stylus({
				'include css': true
			}))
			.pipe(gulp.dest(`${configuration.directories.build}/assets/stylesheets`))
			.pipe(connect.reload())
	})

	gulp.task('stylesheets:clean', () => {
		console.log(`stylesheets: Removing old build files from ${configuration.directories.build}/assets/stylesheets`)
		del.sync(`${configuration.directories.build}/assets/stylesheets`)
	})
}
