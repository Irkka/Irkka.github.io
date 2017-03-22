const del = require('del')

// Gulp plugins
const	connect = require('gulp-connect')

module.exports = (gulp, configuration) => {
	// Load asset related tasks
	['deploy', 'content', 'stylesheets', 'javascripts', 'images'].forEach((task) => {
		require(`./build/${task}`)(gulp, configuration)
	})

	gulp.task('build', ['javascripts', 'stylesheets', 'images', 'content'], () => {})

	gulp.task('serve', () => {
		return connect.server({
			root: configuration.directories.build,
			livereload: true,
			port: 3000
		})
	})

	gulp.task('watch', ['serve', 'build'], () => {
		gulp.watch(`${configuration.directories.content}/**/*.pug`, ['content'])
		gulp.watch(`${configuration.directories.layout}/**/*.pug`, ['content'])
		gulp.watch(`${configuration.directories.stylesheets}/**/*.styl`, ['stylesheets'])
		gulp.watch(`${configuration.directories.javascripts}/**/*.js`, ['javascripts'])
		gulp.watch(`${configuration.directories.javascripts}/**/*.tag`, ['javascripts'])
		gulp.watch(`${configuration.directories.images}/**/*.jpg`, ['images'])
	})
}
