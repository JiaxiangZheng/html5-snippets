define(function (require, exports, module) {
    var svgops = {};

    var svgLeadingString = "http://www.w3.org/2000/svg";

    function hCalPoint(iX, iY, iR, iRadian) {
        var lX = iX + iR * Math.cos(iRadian),
            lY = iY + iR * Math.sin(iRadian);

        return {x: lX, y: lY};
    }

    function hMoveTo(iX, iY) {
        return 'M ' + iX + ' ' + iY;
    }
    function hVertical(iY) {
        return 'V' + iY;
    }
    function hHorizontal(iX) {
        return 'H' + iX;
    }

    function hLineTo(iX, iY) {
        return 'L ' + iX + ' ' + iY;
    }

    function hArcTo(iR, iLargeArc, iClockwise, iX, iY) {
        return 'A ' + iR + ',' + iR + ' 0 ' +
            (iLargeArc ? '1' : '0') + ',' +
            (iClockwise ? '1 ' : '0 ') +
            iX + ',' + iY;
    }

    function hClosePath() {
        return 'Z';
    }

    svgops.getSVGElement = function (type) {
        return document.createElementNS(svgLeadingString, type);
    }

    svgops.getPiePointString = function (iX, iY, iR, iStartDegree, iEndDegree, bAnticlock, shrink) {
        // FIXME: check parameters
        var iStartRadian = iStartDegree * Math.PI / 180,
            iEndRadian = iEndDegree * Math.PI / 180,
            lDStr = "";

        // TODO: 
        if (shrink != undefined) {
            var newCenter;
            iR -= shrink;
            if (bAnticlock) {
                newCenter = hCalPoint(iX, iY, 2, (iStartRadian + (2*Math.PI - iEndRadian)) / 2);
                iStartRadian -= shrink / iR;
                iEndRadian += shrink / iR;
            } else {
                newCenter = hCalPoint(iX, iY, 2, (iStartRadian + iEndRadian) / 2);
                iStartRadian += shrink / iR;
                iEndRadian -= shrink / iR;
            }
            lDStr += hMoveTo(newCenter.x, newCenter.y);
        } else {
            lDStr = hMoveTo(iX, iY);
        }
        var lCurveStartP = hCalPoint(iX, iY, iR, iStartRadian),
            lCurveEndP = hCalPoint(iX, iY, iR, iEndRadian),
            lLargeArc = (iEndRadian - iStartRadian) > Math.PI;
        if (bAnticlock) {
            lLargeArc = !lLargeArc;
        }

        lDStr += (' ' + hLineTo(lCurveStartP.x, lCurveStartP.y));
        lDStr += (' ' + hArcTo(iR, lLargeArc, !bAnticlock, lCurveEndP.x, lCurveEndP.y));
        lDStr += (' ' + hClosePath());

        return lDStr;
    }
    svgops.getRingPointString = function (iX, iY, iInnerR, iOutterR, iStartDegree, iEndDegree) {
        // FIXME: check parameters
        var iStartRadian = 0, 
            iEndRadian = 2 * Math.PI,
            lDStr = "",
            lLargeArc = true;

        // TODO: for startDegree = 0 and endDegree = 360, we should also go else
        // condition
        if (iStartDegree !== undefined && iEndDegree !== undefined) {   // is ring sector
            iStartRadian = iStartDegree * Math.PI / 180;
            iEndRadian = iEndDegree * Math.PI / 180;
            lLargeArc = (iEndRadian - iStartRadian) > Math.PI;

            var lCurveStartPOutter = hCalPoint(iX, iY, iOutterR, iStartRadian),
                lCurveEndPOutter = hCalPoint(iX, iY, iOutterR, iEndRadian),
                lCurveStartPInner = hCalPoint(iX, iY, iInnerR, iStartRadian),
                lCurveEndPInner = hCalPoint(iX, iY, iInnerR, iEndRadian);

            lDStr += (' ' + hMoveTo(lCurveStartPInner.x, lCurveStartPInner.y));
            lDStr += (' ' + hLineTo(lCurveStartPOutter.x, lCurveStartPOutter.y));
            lDStr += (' ' + hArcTo(iOutterR, lLargeArc, true, lCurveEndPOutter.x, lCurveEndPOutter.y));
            lDStr += (' ' + hLineTo(lCurveEndPInner.x, lCurveEndPInner.y));
            // A rx ry x-axis-rotation large-arc-flag sweep-flag(anti-clockwise) x y
            lDStr += (' ' + hArcTo(iInnerR, lLargeArc, false, lCurveStartPInner.x, lCurveStartPInner.y));
            lDStr += (' ' + hClosePath());
        } else {
            var lCurvePOutter = hCalPoint(iX, iY, iOutterR, 0),
                lCurvePInner = hCalPoint(iX, iY, iInnerR, 0);

            lDStr += (' ' + hMoveTo(lCurvePOutter.x, lCurvePOutter.y));
            lDStr += (' ' + hArcTo(iOutterR, lLargeArc, true, lCurvePOutter.x, lCurvePOutter.y));
            lDStr += (' ' + hClosePath());

            lDStr += (' ' + hMoveTo(lCurvePInner.x, lCurvePInner.y));
            lDStr += (' ' + hArcTo(iInnerR, lLargeArc, true, lCurvePInner.x, lCurvePInner.y));
            lDStr += (' ' + hClosePath());
        }
        return lDStr;
    }

    module.exports = svgops;
});
