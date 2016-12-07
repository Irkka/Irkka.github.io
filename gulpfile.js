const configuration = {
	directories: {
		build: './build',
		content: './content',
		layout: './layout',
		stylesheets: './assets/stylesheets'
	}
}

const gulp = require('gulp'),
	build = require('./gulp/build')(gulp, configuration)
