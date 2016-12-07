const configuration = {
	directories: {
		build: './build',
		content: './content',
		layout: './layout',
		stylesheets: './assets/stylesheets',
		javascripts: './assets/javascripts',
		images: './assets/images'
	}
}

const gulp = require('gulp'),
	build = require('./gulp/build')(gulp, configuration)
