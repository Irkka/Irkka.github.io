const del = require('del')

// Gulp Plugins
const pug = require('gulp-pug'),
	frontMatter = require('gulp-front-matter'),
	connect = require('gulp-connect'),
	highlight = require('gulp-highlight')

module.exports = (gulp, configuration) => {
	gulp.task('content', ['content:clean'], () => {
		console.log(`content: Copying HTML files to ${configuration.directories.build}`)
		return gulp.src(`${configuration.directories.content}/**/*.pug`)
			.pipe(frontMatter({ property: 'data', remove: true }))
			.pipe(pug({
				locals: {
					routes: configuration.routes
				}
			}))
			.pipe(highlight())
			.pipe(gulp.dest(configuration.directories.build))
			.pipe(connect.reload())
	})

	gulp.task('content:clean', () => {
		console.log(`content: Removing old build files from ${configuration.directories.build}`)
		del.sync([`${configuration.directories.build}/**/*.html`, `!${configuration.directories.build}`])
	})
}
