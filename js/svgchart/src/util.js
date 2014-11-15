// GMChartPie, GMChartRing, GMChartCircle, GMChartBar
define({
    colorPalette: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
                   '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
                   '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                   '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
    
    getPosition: function getPos(phNode) {
        var info = {
            width: phNode.clientWidth,
            height: phNode.clientHeight
        };
        info.oX = info.width / 2;
        info.oY = info.height / 2;
        return info;
    },

    
    selectShape: function selectShape(selShapes, shape) {
        selShapes.push(shape);
        shape.setAttribute('status', 'selected');
    },

    unselectShape: function unselectShape(selShapes, shape) {
        selShapes = selShapes.filter(function (curshape, index) {
            if (curshape === shape) return false;
            return true;
        });
        shape.setAttribute('status', 'normal');
        return selShapes;
    },

    /**
     * @param shapes <p>should be sorted according to their start
     * radian/degree, and it should belong to a same svg node, so we can set the
     * decorator to the root svg node</p> 
     */
    mergeSlices: function (shapes) {
        var res = [],
            len = shapes.length;

        if (len < 1) return res;

        shapes.sort(function (s1, s2) {
            return s1.sBeginAngle - s2.sBeginAngle;
        });

        var cur = {
            startAngle: shapes[0].sBeginAngle,
            endAngle: shapes[0].sEndAngle
        };
        for (var i = 1; i < len; i++) {
            if (cur.endAngle >= shapes[i].sBeginAngle) {
                cur.endAngle = Math.max(cur.endAngle, shapes[i].sEndAngle);
            } else {
                res.push(cur);
                cur = {
                    startAngle: shapes[i].sBeginAngle,
                    endAngle: shapes[i].sEndAngle
                };
            }
        }
        res.push(cur);

        if (res.length > 1 && Math.abs(res[0].startAngle + 360 - res[res.length - 1].endAngle) < 1 ) {
            res[0].startAngle = res[0].endAngle;
            res[0].endAngle = res[res.length - 1].startAngle;
            res[0].bSeepFlag = true;    // non-anti clock
            res.pop();
        }
        return res;
    }
});

