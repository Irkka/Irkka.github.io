const del = require('del'),
	browserify = require('browserify'),
	riotify = require('riotify'),
	vinylSourceStream = require('vinyl-source-stream')

// Gulp Plugins
	const connect = require('gulp-connect')

module.exports = (gulp, configuration) => {
	gulp.task('javascripts', ['javascripts:clean'], () => {
		browserify({ entries: [`${configuration.directories.javascripts}/ke.js`] })
			.transform(riotify)
			.bundle()
			.pipe(vinylSourceStream('ke.js'))
			.pipe(gulp.dest(`${configuration.directories.build}/assets/javascripts`))
			.pipe(connect.reload())
	})

	gulp.task('javascripts:clean', () => {
		console.log(`javascripts: Removing old build files from ${configuration.directories.build}/assets/javascripts`)
		del.sync(`${configuration.directories.build}/assets/javascripts`)
	})
}
