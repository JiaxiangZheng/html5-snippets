var slice = Array.prototype.slice;

// 接收多个函数 fns 作为参数，返回一个新的函数 fn，当调用 fn 时，会依次使用传入的参
// 数调用 fns 里的每一个函数。
//
// 无返回值
var composite = function () {
    var fns = slice.call(arguments);
    if (fns.length === 0) {
        return function () {
            // empty function
        }
    }
    return function () {
        for (var i=0; i<fns.length; i++) {
            fns.apply(this, arguments)
        }
    }
}

// 接收多个函数 fns 作为参数，返回一个新的函数 fn，当调用 fn 时，会依次使用前一
// 个函数的返回值作为下一个函数的参数值，第一个函数的参数由调用 fn 时指定
//
// 返回最后一个函数的返回值
var compose = function () {
    var fns = slice.call(arguments);
    return function () {
        var args = slice.call(arguments);
        var result = args.slice();
        for (var i=0; i<fns.length; i++) {
            result = fns[i].call(this, result)
        }
        return result;
    }
}

