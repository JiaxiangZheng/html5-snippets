// TODO: make an object being published
// almost all event based programming are using this pattern as a core base.

// publisher
var publisher = (function () {
    return {
        subscribers: {
            any: []
        },
        on: function (type, fn, context) {
            type = type || "any";
            fn = (typeof fn === "function") ? fn : context[fn];
            if (!this.subscribers[type]) {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push({
                fn: fn,
                context: context;
            });
        },
        remove: function (type, fn, context) {
            this.visitSubscribers("unsubscribe", type, fn, context);
        },
        fire: function (type, publication) {
            this.visitSubscribers("publish", type, publication);
        },
        visitSubscribers: function (action, type, arg, context) {
            var pubtype = type || "any",
                subscribers = this.subscribers[pubtype],
                i, len = subscribers ? subscribers.length : 0;
            for (i = 0; i < len; i++) {
                if (action === "publish") {
                    subscribers[i].fn.call(subscribers[i].context, arg);
                } else {
                    if (subscribers[i].fn === arg && 
                            subscribers[i].context === context) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };
})();
