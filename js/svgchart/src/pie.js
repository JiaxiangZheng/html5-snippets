define(function (require, exports, module) {
    var svgops = require('./svg'),
        util = require('./util');

  	function Pie(placeholder, data) {
		this.placeholder = document.querySelector(placeholder);
  		this.data = data;
  	}
    function getOutterDecorator(slice, centerX, centerY, radius) {
        var decoratorNode;
        if (Math.abs(slice.startAngle + 360 - slice.endAngle) < 1) {
            decoratorNode = svgops.getSVGElement("circle");
            decoratorNode.setAttribute("cx", centerX);
            decoratorNode.setAttribute("cy", centerY);
            decoratorNode.setAttribute("r", radius - 1);
        } else {
            decoratorNode = svgops.getSVGElement("path");
            decoratorNode.setAttribute('d', svgops.getPiePointString(centerX, centerY, radius - 1, slice.startAngle, slice.endAngle, slice.bSeepFlag));
        }
        decoratorNode.setAttribute("class", "gm-outter-decorator");
        return decoratorNode;
    }
    function getInnerDecorator(slice, centerX, centerY, radius) {
        var decoratorNode;
        if (Math.abs(slice.startAngle + 360 - slice.endAngle) < 1) {
            decoratorNode = svgops.getSVGElement("circle");
            decoratorNode.setAttribute("cx", centerX);
            decoratorNode.setAttribute("cy", centerY);
            decoratorNode.setAttribute("r", radius - 3);
        } else {
            decoratorNode = svgops.getSVGElement("path");
            // TODO: we should move the center for inner decorator node
            // FIXME: for the anticloc arch across the 0 degree, the white
            // decorator's spreading direction is wrong

            // shrink denotes the circle's center should move a bit outter 
            decoratorNode.setAttribute('d', svgops.getPiePointString(centerX, centerY, radius, slice.startAngle, slice.endAngle, slice.bSeepFlag, 3));
        }
        decoratorNode.setAttribute("class", "gm-inner-decorator");
        return decoratorNode;
    }

  	Pie.prototype.render = function () {
        var data = this.data,
            phNode = this.placeholder,
            svgNode = this.svg = svgops.getSVGElement('svg'),
            color = util.colorPalette;
        if (!data || data.length === 0) return;

        svgNode.style.width = '100%'; svgNode.style.height = '100%';
        phNode.appendChild(svgNode); 

        var groupNode = svgops.getSVGElement('g');
        groupNode.setAttribute("class", "gm-shapes-group");
        svgNode.appendChild(groupNode);

        var sum = data.reduce(function (x, y) { return x + y; }, 0),
            curSum = 0;
        var posInfo = util.getPosition(phNode);
        var centerX = posInfo.oX, 
            centerY = posInfo.oY,
            radius = Math.min(posInfo.oX, posInfo.oY) - 10;

        data.forEach(function (value, index) {
            var startAngle = 360 * curSum,
                endAngle = 360 * (curSum += (value / sum)),
                pathNode = svgops.getSVGElement("path");
            pathNode.setAttribute("class", "gm-shape-pie");
            pathNode.setAttribute("type", "shape");
            pathNode.setAttribute("subtype", "pie");
            pathNode.setAttribute("status", "normal");
            
            pathNode.sX = centerX;
            pathNode.sY = centerY;
            pathNode.sR = radius;
            pathNode.sBeginAngle = startAngle;
            pathNode.sEndAngle = endAngle;

            pathNode.setAttribute('d', svgops.getPiePointString(centerX, centerY, radius, startAngle, endAngle));
            pathNode.style.fill = color[index % color.length];
            groupNode.appendChild(pathNode);
        });

        this.hasRendered = true;

        ["mouseover", "mouseout", "click"].forEach(function (name) {
            if (typeof this[name] !== 'function') return;
            phNode.addEventListener(name, this[name], false);
        }.bind(this));
  	}

    Pie.prototype.click = function (evt) {
        var tar = evt.target;
        if (tar.getAttribute("type") != "shape") return;

        var svgNode = tar.parentNode.parentNode;
        var selShapes = this.selectedShapes || (this.selectedShapes = []);
        if (tar.getAttribute("status") === "selected") {
            selShapes = this.selectedShapes = util.unselectShape(selShapes, tar);
        } else {
            util.selectShape(selShapes, tar);
        }
        if (svgNode.decorator) {
            svgNode.removeChild(svgNode.decorator);
            delete svgNode.decorator;
        }

        var mergeSlices = util.mergeSlices(selShapes);
        var decoratorGroup = svgops.getSVGElement('g');

        svgNode.decorator = decoratorGroup;
        svgNode.appendChild(decoratorGroup);

        var centerX = tar.sX,
            centerY = tar.sY,
            radius = tar.sR;
        mergeSlices.forEach(function (slice) {
            // circle
            var decoratorOutter = getOutterDecorator(slice, centerX, centerY, radius);
            decoratorGroup.appendChild(decoratorOutter);
            var decoratorInner = getInnerDecorator(slice, centerX, centerY, radius);
            decoratorGroup.appendChild(decoratorInner);
        });
    }
    // TODO: we should move this to an abstract class which can serve as default behavior
  	module.exports = Pie;
});
