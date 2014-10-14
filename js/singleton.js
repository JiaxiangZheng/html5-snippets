// 每个JS对象实际上都是独一无二的，即本身就是单例。但我们还是希望使用 `var
// instance = new Singleton()` 这种形式构造单例。
//
// 为实现这个目的，可以在多次使用 `new` 构造对象的时候始终返回同一个对象
//

// 1. 使用全局变量保存这个单例对象
//    代码略

// 2. 将该单例对象保存到构造函数的一个属性中
//    缺点是单例对象可以被外部修改
(function () {
    function Singleton() {
        if (typeof Singleton.instance === 'object') {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
    var s1 = new Singleton();
    Singleton.prototype.property = true;
    var s2 = new Singleton();

    console.log("singleton with static property");
    console.log(s1 === s2); // true
    console.log(s1.property); // undefined
    console.log(Singleton === s1.constructor); // false
}());

// 3. 使用闭包，通过重写构造函数使得第二次以后调用到的都是新的构造函数
//    缺点：重写构造函数会导致在第二次调用构造函数以后加的原型属性（或方法）会丢失无效，见函数中最底下三行
(function () {
    function Singleton() {
        var instance = this;
        Singleton = function () {
            return instance;
        }
    }
    var s1 = new Singleton();
    Singleton.prototype.property = true;
    var s2 = new Singleton();

    console.log("singleton with clousure");
    console.log(s1 === s2); // true
    console.log(s1.property); // undefined
    console.log(Singleton === s1.constructor); // false
}());

// 4. 使用闭包，修正 3 中的问题
(function () {
    var Singleton = (function () {
        var instance;
        function Singleton() {
            if (instance) {
                return instance;
            }
            instance = this;
        }
        return Singleton;
    }());

    var s1 = new Singleton();
    Singleton.prototype.property = true;
    var s2 = new Singleton();

    console.log("singleton with fixed clousure");
    console.log(s1 === s2); // true
    console.log(s1.property); // undefined
    console.log(Singleton === s1.constructor); // false
}());
