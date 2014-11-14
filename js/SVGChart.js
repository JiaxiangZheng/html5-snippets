(function (exports){
	var svgLeadingString = "http://www.w3.org/2000/svg",
	    colorDefault = ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
                        '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
                        '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                        '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'];

    function hCalPoint(iX, iY, iR, iRadian) {
        var lX = iX + iR * Math.cos(iRadian),
            lY = iY + iR * Math.sin(iRadian);

        return {x: lX, y: lY};
    }

    function hMoveTo(iX, iY) {
        return "M " + iX + " " + iY;
    }

    function hLineTo(iX, iY) {
        return "L " + iX + " " + iY;
    }

    function hArcTo(iR, iLargeArc, iClockwise, iX, iY) {
        return "A " + iR + "," + iR + " 0 " +
            (iLargeArc ? "1" : "0") + "," +
            (iClockwise ? "1 " : "0 ") +
            iX + "," + iY;
    }

    function hClosePath() {
        return "Z";
    }
    function getPiePointString(iX, iY, iR, iStartDegree, iEndDegree) {
        var iStartRadian = iStartDegree * Math.PI / 180,
            iEndRadian = iEndDegree * Math.PI / 180;

        var lDStr = hMoveTo(iX, iY),
            lCurveStartP = hCalPoint(iX, iY, iR, iStartRadian),
            lCurveEndP = hCalPoint(iX, iY, iR, iEndRadian),
            lLargeArc = (iEndRadian - iStartRadian) > Math.PI;

        lDStr += (" " + hLineTo(lCurveStartP.x, lCurveStartP.y));
        lDStr += (" " + hArcTo(iR, lLargeArc, true, lCurveEndP.x, lCurveEndP.y));
        lDStr += (" " + hClosePath());

        return lDStr;
    }

	/**
	 * @param type String such as "path", "svg", etc...
	 */
	function getSVGElement(type) {
		return document.createElementNS(svgLeadingString, type);
	}

	function hasSelected(shape) {
		var status = shape.getAttribute('status');
		if (status && status.indexOf('select') > -1) return true;
		return false;
	}
	function selectShape(shape) {
		shape.setAttribute('status', 'select');
		shape.style.stroke = 'black'; shape.style.strokeWidth = 2;
	}
	function unselectShape(shape) {
		shape.setAttribute('status', '');
		shape.style.strokeWidth = 0;
	}
    function attachEvents(node) {
		node.addEventListener("mouseover", function (evt) {
			var tar = evt.target;
			if (tar.getAttribute("type") != "shape") return;
			tar.style.opacity = 0.5;
		});
		node.addEventListener("mouseout", function (evt) {
			var tar = evt.target;
			if (tar.getAttribute("type") != "shape") return;
			tar.style.opacity = 1.0;
		});
		node.addEventListener('click', function (evt) {
			var tar = evt.target;
			if (tar.getAttribute("type") != "shape") return;
			if (hasSelected(tar)) {
				unselectShape(tar);
			} else {
				selectShape(tar);
			}
		});
        var mouseDown = false;
		node.addEventListener('mousedown', function (evt) {
            console.log('mousedown');
            mouseDown = true;
        });
        node.addEventListener('mouseup', function (evt) {
            mouseDown = false;
        });
        node.addEventListener('mousemove', function (evt) {
            if (!mouseDown) return;
            console.log("selecting lasso");
        });
    }
	function Pie(placeholder, data) {
		this.pNode = document.getElementById(placeholder);
		if (data) {
			this.update(data);
		}
        attachEvents(this.pNode);
	}
	Pie.prototype.unrender = function () {
		var ph = this.pNode,
			chs = ph.childNodes;
		[].forEach.call(chs, function (ch) {
			ph.removeChild(ch);
		});
		this.hasRendered = false;
	}
	Pie.prototype.update = function (data) {
		if (!data || data.length === 0) return;

		if (this.hasRendered) {
			this.unrender();
		}

		var ph = this.pNode,
			svg = getSVGElement("svg");

		svg.style.width = "100%";
		svg.style.height = "100%";
		ph.appendChild(svg);

		var sum = data.reduce(function (x, y) {return x + y;}, 0),
			curSum = 0;
		var centerX = 200, 
			centerY = 200,
			radius = 100;

		data.forEach(function (value, index) {
			var startAngle = 360 * curSum,
				endAngle = 360 * (curSum += (value / sum)),
				pathNode = getSVGElement("path");
			pathNode.setAttribute("class", "gm-shape-pie");
			pathNode.setAttribute("type", "shape");
			pathNode.setAttribute("subtype", "pie");
			pathNode.setAttribute('d', getPiePointString(centerX, centerY, radius, startAngle, endAngle));
			pathNode.style.fill = colorDefault[index % colorDefault.length];
			svg.appendChild(pathNode);
		});

		this.hasRendered = true;
	}

	exports.Pie = Pie;
}(window));
