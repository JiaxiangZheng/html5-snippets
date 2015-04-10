/**
 * Created by Tsung on 2015/4/9.
 */
define(function (require, exports, module) {
	function wrap(fnDst, fnSrc) {
		return function () {
			var tmp = this.super;
			fnDst = fnDst || function () {};
			this.super = fnSrc;
			var ret = fnDst.apply(this, arguments);
			this.super = tmp;
			return ret;
		}
	}
	function extend(dst, src) {
		for (var prop in src) {
			if (src.hasOwnProperty(prop)) {
				var val = src[prop];
				if (typeof val === 'function' && /super/.test(val.toString())) {
					dst[prop] = wrap(val, dst[prop]);
				} else {
					dst[prop] = val;
				}
			}
		}
		return dst;
	};
	exports.inherit = function (Subclass, mixins, config) {
		if (typeof Subclass !== 'function') {
			if (Array.isArray(Subclass)) {
				config = mixins;
				mixins = Subclass;
			} else {
				config = Subclass;
				mixins = [];
			}
			Subclass = Object;
		}

		function Constructor(props) {
			if (props) {
				this.init && this.init(props);
			}
		}
		var proto = Constructor.prototype = new Subclass();
		proto.constructor = Constructor;

		for (var i = 0, len = mixins.length; i < len; i++) {
			extend(proto, mixins[i]);
		}
		extend(proto, config);
		return Constructor;
	};
});
