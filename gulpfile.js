const configuration = {
	directories: {
		build: './build',
		content: './content',
		layout: './layout',
		stylesheets: './assets/stylesheets',
		javascripts: './assets/javascripts',
		images: './assets/images'
	},
	routes: [
		{ icon: '⌂', text: 'Home', path: '' },
		{ icon: '🕮', text: 'Blog', path: 'blog' },
		{ icon: '⚒', text: 'Craft', path: 'craft' }
	]
}

const gulp = require('gulp'),
	build = require('./gulp/build')(gulp, configuration)
