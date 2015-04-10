/**
 * Created by Tsung on 2015/4/10.
 */
define(function (require, exports, module) {
	var util = require('core/util');
	var Menu = require('./Menu');

	return util.inherit(Menu, [], {
		init: function (prop) {
			this.super(prop);
			console.log('COME FROM INHERIT CLASS');
		},
		className: 'ListMenu',
		minWidth: 800,
		add: function (item) {
			this.items.push(item);
		},
		print: function () {
			console.log('------------------------')
			this.items.forEach(function (item, index) {
				console.log(index, item);
			});
			console.log('------------------------')
		},
		items: []
	});
});
