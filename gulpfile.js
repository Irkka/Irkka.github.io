const configuration = {
	directories: {
		build: './build',
		content: './content',
		layout: './layout'
	}
}

const gulp = require('gulp'),
	build = require('./gulp/build')(gulp, configuration)
