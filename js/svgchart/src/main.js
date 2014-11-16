define(function (require) {
	var Pie = require('./pie'),
		Ring = require('./ring');

    var len = 5,
        data = [];
    for (var i = 0; i < len; i++) {
        data.push(Math.random() * 100);
    }

	var pieChart = new Pie('#svg-pie', data),
		ringChart = new Ring('#svg-ring', data);

	pieChart.render();
	ringChart.render();
});
