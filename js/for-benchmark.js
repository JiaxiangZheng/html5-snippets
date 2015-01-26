// native for loop vs forEach

//console.time("native for");
//console.timeEnd("native for");
//
//console.time("forEach");
//console.timeEnd("forEach");
//
var fnPlay = function (index) {
    var res = Math.sqrt(index * index);
    return res;
}
var fib = function fib(n) {
    if (n === 0) return 1;
    if (n === 1) return 1;
    return fib(n-1) + fib(n-2);
};

if (document) {
    // nodes is HTMLCollection type
    var nodes = document.getElementsByTagName("span"), n, i, len, N = 1000;

    // with cache
    console.time("HTMLCollection with cache");
    for (n = 0; n < N; n++) {
        for (i = 0, len = nodes.length; i < len; i++) {
            fib(10);
        }
    }
    console.timeEnd("HTMLCollection with cache");

    // without cache
    console.time("HTMLCollection without cache");
    for (n = 0; n < N; n++) {
        for (i = 0; i < nodes.length; i++) {
            fib(10);
        }
    }
    console.timeEnd("HTMLCollection without cache");


    nodes = [].slice.call(nodes);
    // with cache
    console.time("Array with cache");
    for (n = 0; n < N; n++) {
        for (i = 0, len = nodes.length; i < len; i++) {
            fib(10);
        }
    }
    console.timeEnd("Array with cache");

    // without cache
    console.time("Array without cache");
    for (n = 0; n < N; n++) {
        for (i = 0; i < nodes.length; i++) {
            fib(10);
        }
    }
    console.timeEnd("Array without cache");

}
