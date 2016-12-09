const del = require('del'),
	moment = require('moment'),
	browserify = require('browserify'),
	riotify = require('riotify'),
	vinylSourceStream = require('vinyl-source-stream')

// Gulp plugins
const ghPages = require('gulp-gh-pages'),
	pug = require('gulp-pug'),
	frontMatter = require('gulp-front-matter'),
	connect = require('gulp-connect'),
	stylus = require('gulp-stylus'),
	highlight = require('gulp-highlight')

module.exports = (gulp, configuration) => {
	gulp.task('build', ['javascripts', 'stylesheets', 'images', 'content'], () => {})

	gulp.task('deploy', ['build'], () => {
		console.log(`Deploying site from ${configuration.directories.build}`)

		let timestamp = moment().format('YYYY-MM-DDTHH:mm:ss')

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
