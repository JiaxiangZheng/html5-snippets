define(function (require, exports, module) {
    var svgops = require('./svg'),
        util = require('./util');

    function Ring(placeholder, data) {
        this.placeholder = document.querySelector(placeholder);
        this.data = data;
    }

    Ring.prototype.render = function () {
        var data = this.data,
            phNode = this.placeholder,
            svgNode = this.svg = svgops.getSVGElement('svg'),
            color = util.colorPalette;
        if (!data || data.length === 0) return;

        svgNode.style.width = '100%'; svgNode.style.height = '100%';
        phNode.appendChild(svgNode); 

        var sum = data.reduce(function (x, y) {return x + y;}, 0),
            curSum = 0;
        var posInfo = util.getPosition(phNode);
        var centerX = posInfo.oX, 
            centerY = posInfo.oY,
            radius = Math.min(posInfo.oX, posInfo.oY) - 10;

        data.forEach(function (value, index) {
            var startAngle = 360 * curSum,
                endAngle = 360 * (curSum += (value / sum)),
                pathNode = svgops.getSVGElement("path");
            pathNode.setAttribute("class", "gm-shape-ring");
            pathNode.setAttribute("type", "shape");
            pathNode.setAttribute("subtype", "ring");
            
            pathNode.sX = centerX;
            pathNode.sY = centerY;
            pathNode.sR = radius;
            pathNode.sBeginAngle = startAngle;
            pathNode.sEndAngle = endAngle;
            pathNode.index = index;

            pathNode.setAttribute('d', svgops.getRingPointString(centerX, centerY, radius, radius / 2, startAngle, endAngle));
            pathNode.style.fill = color[index % color.length];
            svgNode.appendChild(pathNode);
        });

        this.hasRendered = true;
        
        ["mouseover", "mouseout", "click"].forEach(function (name) {
            if (typeof this[name] !== 'function') return;
            phNode.addEventListener(name, this[name], false);
        }.bind(this));
    }

    Ring.prototype.click = function (evt) {
        console.log("You click me");
    }

    // TODO: we should move this to an abstract class which can serve as default behavior
    Ring.prototype.mouseover = function (evt) {
        var tar = evt.target;
        if (tar.getAttribute("type") != "shape") return;
        tar.style.opacity = 0.7;
    }
    Ring.prototype.mouseout = function (evt) {
        var tar = evt.target;
        if (tar.getAttribute("type") != "shape") return;
        tar.style.opacity = 1.0;
    }
    module.exports = Ring;
});
