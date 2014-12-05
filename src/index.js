var type = require("type");


var WeakMapShim = global.WeakMap,
    hasOwnProp = Object.prototype.hasOwnProperty,
    nativeValueOf = Object.prototype.valueOf,
    createStore, hiddenStore;


if (type.isNative(WeakMapShim)) {
    hiddenStore = function hiddenStore(obj, key) {
        var store = {
                key: key
            },
            valueOf = obj.valueOf;

        obj.valueOf = function(value) {
            return value !== key ? valueOf.apply(this, arguments) : store;
        };

        return store;
    };

    createStore = function createStore() {
        var key = {},
            keys = [];

        return function(obj, clear) {
            var store, i;

            if (clear === true) {
                i = keys.length;

                while (i--) {
                    keys[i].valueOf = nativeValueOf;
                }
                keys.length = 0;
                return undefined;
            }

            if (!type.isObject(obj)) {
                throw new TypeError("Invalid value used as weak map key");
            }

            store = obj.valueOf(key);

            if (store == null || store.key !== key) {
                store = hiddenStore(obj, key);
                keys[keys.length] = obj;
            }

            return store;
        };
    };

    WeakMapShim = function WeakMap() {
        var privates;

        if (!(this instanceof WeakMapShim)) {
            throw new TypeError("Constructor WeakMap requires 'new'");
        }

        privates = createStore();

        this.set = function set(key, value) {
            privates(key).value = value;
        };

        this.get = function get(key, fallback) {
            var store = privates(key);
            return hasOwnProp.call(store, "value") ? store.value : fallback;
        };

        this.has = function has(key) {
            return hasOwnProp.call(privates(key), "value");
        };

        this.remove = this["delete"] = function remove(key) {
            return delete privates(key).value;
        };

        this.clear = function clear() {
            privates(null, true);
        };
    };
    WeakMapShim.prototype.constructor = WeakMapShim;
} else {
    WeakMap.prototype.remove = WeakMap.prototype["delete"];
}


module.exports = WeakMapShim;
