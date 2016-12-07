const del = require('del'),
	moment = require('moment')

// Gulp plugins
const ghPages = require('gulp-gh-pages'),
	pug = require('gulp-pug'),
	frontMatter = require('gulp-front-matter'),
	connect = require('gulp-connect')

module.exports = (gulp, configuration) => {
	gulp.task('build', ['content'], () => {})

	gulp.task('deploy', ['build'], () => {
		let timestamp = moment().format('YYYY-MM-DDTHH:mm:ss')
		console.log('Deploying site')

		return gulp.src(`${configuration.directories.build}/**/*`)
			.pipe(ghPages({
				origin: 'origin',
				branch: 'master',
				cacheDir: '.publish',
				message: `Build timestamp @ ${timestamp}`
			}))
	})

	gulp.task('content', ['content:clean'], () => {
		console.log(`content: Copying HTML files to ${configuration.directories.build}`)
		return gulp.src(`${configuration.directories.content}/**/*.pug`)
			.pipe(frontMatter({ property: 'data', remove: true }))
			.pipe(pug())
			.pipe(gulp.dest(configuration.directories.build))
			.pipe(connect.reload())
	})

	gulp.task('content:clean', () => {
		console.log(`content: Removing old build files from ${configuration.directories.build}`)
		del.sync([`${configuration.directories.build}/**/*.html`, `!${configuration.directories.build}`])
	})

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
	})
}
