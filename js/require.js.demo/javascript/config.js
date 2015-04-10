/**
 * Created by Tsung on 2015/4/9.
 */
requirejs.config({
	baseUrl: './javascript',
	paths: {
		'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
		'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
		'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min',
		'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',

		'app': 'app',
		'core': 'core'
	},
	shim: {	// set an array of dependencies
		'backbone': ['jquery', 'underscore'],
		'bootstrap': ['jquery']
	}
});
