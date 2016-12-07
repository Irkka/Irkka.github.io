const configuration = {
	directories: {
		build: './build',
		content: './content',
		layout: './layout',
		stylesheets: './assets/stylesheets',
		javascripts: './assets/javascripts'
	}
}

const gulp = require('gulp'),
	build = require('./gulp/build')(gulp, configuration)
