var rSuper = /this\.\_super/;

function mixin(src, dst) {
    if (src) {
        dst = dst || {};
        var fnWarp = function (overwritting, inher) {
            return function superwarp() {
                var tmp = this._super;
                this._super = inher;
                var ret = overwritting.call(this, arguments || []);
                this._super = tmp;
                return ret;
            }
        };
        for (var n in src) {
            if ((typeof src[n] === 'function') && (rSuper.test(src[n]))) {
                dst[n] = fnWarp(src[n], dst[n]);
            } else {
                dst[n] = src[n];
            }
        }
    }
    return dst;
}

function _isFunction(obj) {
    return typeof obj === 'function';
}

/**
 * Create a javascript custom class based on given super class and related
 * mixins, also support instance properties and methods
 *
 * @param {Object | Function} SuperCls The base class object
 * @param {Object []} mixins Optional mixins
 * @param {Object} config Optional customized properties
 */
function declare(SuperCls, mixins, config) {
    function Constr(props) {
        if (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }
        }
    }

    if (SuperCls) {
        if (_isFunction(SuperCls)) {
            Constr.prototype = new SuperCls();
        } else {
            Constr.prototype = SuperCls;
        }
        Constr.prototype.constructor = Constr;
    }

    var proto = Constr.prototype;
    for (var i=0, len=mixins.length; i < len; i++) {
        proto = mixin(mixins[i], proto);
    }
    if (config) {
        proto = mixin(config, proto);
    }
    return Constr;
}


var People = declare({}, [], {
    alias: 'People',
    say: function () {
        console.log("Hi I am people");
    }
});

var people = new People({
    alias: 'Jiaxiang Zheng'
});

var me = new People({
    alias: 'octman.com',
    say: function () {
        this._super();
        console.log("I cam from octman.com");
    }
});

var Employee = declare(people, [me], {
    name: 'Employee',
    sex: 'male',
    age: null,
    say: function () {
        this._super();
        console.log("Hi I am employ");
    }
});

// DO NOT use super in parameters when new an instance
// ONLY overwrite the parameters it required
var employee = new Employee({
    age: 24
});


employee.say();

console.log(employee.alias)

