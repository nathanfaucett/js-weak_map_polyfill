var isNative = require("is_native"),
    isPrimitive = require("is_primitive"),
    createWeakMap = require("create_weak_map");


var NativeWeakMap = typeof(WeakMap) !== "undefined" ? WeakMap : null,
    WeakMapShim;


if (isNative(NativeWeakMap)) {
    WeakMapShim = NativeWeakMap;

    WeakMapShim.prototype.count = function() {
        return this.size;
    };
} else {
    WeakMapShim = function WeakMap() {
        if (!(this instanceof WeakMap)) {
            throw new TypeError("Constructor WeakMap requires 'new'");
        }

        this.__map = createWeakMap();
    };
    WeakMapShim.prototype.constructor = WeakMapShim;

    WeakMapShim.prototype.get = function(key) {

        return this.__map.get(key);
    };

    WeakMapShim.prototype.set = function(key, value) {
        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        }

        this.__map.set(key, value);
    };

    WeakMapShim.prototype.has = function(key) {

        return this.__map.has(key);
    };

    WeakMapShim.prototype["delete"] = function(key) {

        return this.__map.remove(key);
    };

    WeakMapShim.prototype.clear = function() {

        this.__map.clear();
    };

    if (Object.defineProperty) {
        Object.defineProperty(WeakMapShim.prototype, "size", {
            get: function() {
                return this.__map.size();
            }
        });
    }

    WeakMapShim.prototype.count = function() {
        return this.__map.size();
    };

    WeakMapShim.prototype.length = 1;
}

WeakMapShim.prototype.remove = WeakMapShim.prototype["delete"];


module.exports = WeakMapShim;
