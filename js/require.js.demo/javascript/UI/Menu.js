/**
 * Created by Tsung on 2015/4/10.
 */
define(['core/util'], function (util) {
	return util.inherit({
		init: function (prop) {
			console.log(prop || 'HELLO');
		},
		className: 'Menu',
		maxWidth: 1024
	});
});
