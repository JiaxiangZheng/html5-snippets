var op = Object.prototype;
op.method = function (name, fun) {
  this[name] = this[name] || fun;
};
op.method('on', function (types, callback) {
  types = types.split(' ');
  types.forEach(function (type) {
    var evts = obj.events = obj.events || {};
    evts[type] = callback;
  });
});
op.method('off', function (types) {
  types = types.split(' ');
  types.forEach(function (type) {
    var evts = obj.events = obj.events || {};
    delete evts[type];
  });
});

// TODO: should we silently ignore if the type callback does not exist?
op.method('trigger', function (type, msg) {
  var evts = obj.events,
      callback = evts && evts[type];

  if (callback) {
    callback(msg);
  }
});

op.method('set', function (info) {
});

////////////////////////////////////////////////////////////////////////////////

var obj = {};

obj.on('click', function (msg) {
  console.log('I am clicked: ' + msg);
});

obj.trigger('click', 'msg');
