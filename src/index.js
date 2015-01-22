var isNative = require("is_native"),
    isPrimitive = require("is_primitive"),
    createWeakMap = require("create_weak_map");


var NativeWeakMap = typeof(WeakMap) !== "undefined" ? WeakMap : null,
    WeakMapPolyfill;


if (isNative(NativeWeakMap)) {
    WeakMapPolyfill = NativeWeakMap;

    WeakMapPolyfill.prototype.count = function() {
        return this.size;
    };
} else {
    WeakMapPolyfill = function WeakMap() {
        if (!(this instanceof WeakMap)) {
            throw new TypeError("Constructor WeakMap requires 'new'");
        }

        this.__map = createWeakMap();
    };
    WeakMapPolyfill.prototype.constructor = WeakMapPolyfill;

    WeakMapPolyfill.prototype.get = function(key) {

        return this.__map.get(key);
    };

    WeakMapPolyfill.prototype.set = function(key, value) {
        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        }

        this.__map.set(key, value);
    };

    WeakMapPolyfill.prototype.has = function(key) {

        return this.__map.has(key);
    };

    WeakMapPolyfill.prototype["delete"] = function(key) {

        return this.__map.remove(key);
    };

    WeakMapPolyfill.prototype.clear = function() {

        this.__map.clear();
    };

    if (Object.defineProperty) {
        Object.defineProperty(WeakMapPolyfill.prototype, "size", {
            get: function() {
                return this.__map.size();
            }
        });
    }

    WeakMapPolyfill.prototype.count = function() {
        return this.__map.size();
    };

    WeakMapPolyfill.prototype.length = 1;
}

WeakMapPolyfill.prototype.remove = WeakMapPolyfill.prototype["delete"];


module.exports = WeakMapPolyfill;
