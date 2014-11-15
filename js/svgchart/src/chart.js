define(function (require, exports, module) {
    function AbstractChart(placeholder, data) {
        this.placeholder = document.querySelector(placeholder);
        this.data = data;
    }
    AbstractChart.prototype.click = function (evt) {
        console.log("You click me");
    }
    AbstractChart.prototype.mouseover = function (evt) {
        var tar = evt.target;
        if (tar.getAttribute("type") != "shape") return;
        tar.style.opacity = 0.7;
    }
    AbstractChart.prototype.mouseout = function (evt) {
        var tar = evt.target;
        if (tar.getAttribute("type") != "shape") return;
        tar.style.opacity = 1.0;
    }
});
