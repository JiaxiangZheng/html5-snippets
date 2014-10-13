// shadow copy
function extend(obj, props) {
    props = props || {};
    for (var prop in props) {
        if (!obj.hasOwnProperty(prop)) {
            obj[prop] = props[prop];
        }
    }
}

// deep copy
function deepExtend(parent, child) {
    var i,
        toStr = Object.prototype.toString,
        astr = '[object Array]',
        child = child || {};

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] === "object") {
                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                deepExtend(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}

