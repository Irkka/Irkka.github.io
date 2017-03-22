const moment = require('moment')

// Gulp Plugins
const ghPages = require('gulp-gh-pages')

module.exports = (gulp, configuration) => {
	gulp.task('deploy', ['build'], () => {
		console.log(`Deploying site from ${configuration.directories.build}`)

		let timestamp = moment().format('YYYY-MM-DDTHH:mm:ss')

		return gulp.src(`${configuration.directories.build}/**/*`)
			.pipe(ghPages({
				origin: 'origin',
				branch: 'master',
				cacheDir: '.publish',
				push: true,
				message: `Build timestamp @ ${timestamp}`
			}))
	})
}
