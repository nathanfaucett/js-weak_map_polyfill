var type = require("type"),
    createMap = require("create_map");


var NativeWeakMap = typeof(WeakMap) !== "undefined" ? WeakMap : null,
    WeakMapShim;


if (type.isNative(NativeWeakMap)) {
    WeakMapShim = NativeWeakMap;

    WeakMapShim.prototype.count = function() {
        return this.size;
    };
} else {
    WeakMapShim = function WeakMap() {
        if (!(this instanceof WeakMap)) {
            throw new TypeError("Constructor WeakMap requires 'new'");
        }

        this._map = createMap();
    };
    WeakMapShim.prototype.constructor = WeakMapShim;

    WeakMapShim.prototype.get = function(key) {

        return this._map.get(key);
    };

    WeakMapShim.prototype.set = function(key, value) {
        if (type.isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        }

        this._map.set(key, value);
    };

    WeakMapShim.prototype.has = function(key) {

        return this._map.has(key);
    };

    WeakMapShim.prototype["delete"] = function(key) {

        return this._map.remove(key);
    };

    WeakMapShim.prototype.clear = function() {

        this._map.clear();
    };

    if (Object.defineProperty) {
        Object.defineProperty(WeakMapShim.prototype, "size", {
            get: function() {
                return this._map.size();
            }
        });
    }

    WeakMapShim.prototype.count = function() {
        return this._map.size();
    };

    WeakMapShim.prototype.length = 1;
}

WeakMapShim.prototype.remove = WeakMapShim.prototype["delete"];


module.exports = WeakMapShim;
