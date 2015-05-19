var isNative = require("is_native"),
    isPrimitive = require("is_primitive"),
    createWeakMap = require("create_weak_map");


var NativeWeakMap = typeof(WeakMap) !== "undefined" ? WeakMap : null,
    WeakMapPolyfill, WeakMapPolyfillPrototype;


if (isNative(NativeWeakMap)) {
    WeakMapPolyfill = NativeWeakMap;
    WeakMapPolyfillPrototype = WeakMapPolyfill.prototype;
} else {
    WeakMapPolyfill = function WeakMap() {
        if (!(this instanceof WeakMap)) {
            throw new TypeError("Constructor WeakMap requires 'new'");
        } else {
            this.__map = createWeakMap();
        }
    };
    WeakMapPolyfillPrototype = WeakMapPolyfill.prototype;
    WeakMapPolyfillPrototype.constructor = WeakMapPolyfill;

    WeakMapPolyfillPrototype.get = function(key) {
        return this.__map.get(key);
    };

    WeakMapPolyfillPrototype.set = function(key, value) {
        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        } else {
            this.__map.set(key, value);
        }
    };

    WeakMapPolyfillPrototype.has = function(key) {
        return this.__map.has(key);
    };

    WeakMapPolyfillPrototype["delete"] = function(key) {
        return this.__map.remove(key);
    };

    WeakMapPolyfillPrototype.length = 0;
}

WeakMapPolyfillPrototype.remove = WeakMapPolyfillPrototype["delete"];
WeakMapPolyfillPrototype.__KeyedCollection__ = true;
WeakMapPolyfillPrototype.__Collection__ = true;


module.exports = WeakMapPolyfill;
