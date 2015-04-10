/**
 * Created by Tsung on 2015/4/9.
 */
define(['core/util', 'UI/ListMenu'/*, 'backbone'*/], function (util, ListMenu/*, backbone*/) {
	var listMenu = new ListMenu({
		minWidth: 1000
	});

	console.log(listMenu.className);
	listMenu.add('A');
	listMenu.add('B');
	listMenu.print();

	return {
		add: function (a, b) {
			return a + b;
		},
		sub: function (a, b) {
			return a - b;
		},
		multi: function (a, b) {
			return a * b;
		},
		div: function (a, b) {
			return a / b;
		}
	};
});
