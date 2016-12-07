const del = require('del'),
	moment = require('moment')

// Gulp plugins
const ghPages = require('gulp-gh-pages')

module.exports = (gulp) => {
	gulp.task('build', () => {
		console.log('Clean up build directory')
		del.sync('build')

		console.log('Build site')
		return gulp.src('layout/**/*.html')
			.pipe(gulp.dest('build'))
	})

	gulp.task('deploy', ['build'], () => {
		let timestamp = moment().format('YYYY-MM-DDTHH:mm:ss')
		console.log('Deploying site')

		return gulp.src('./build/**/*')
			.pipe(ghPages({
				origin: 'origin',
				branch: 'master',
				cacheDir: '.publish',
				message: `Build timestamp @ ${timestamp}`
			}))
	})
}
