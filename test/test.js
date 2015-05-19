var assert = require("assert");


global.WeakMap = undefined;


describe("WeakMap", function() {
    var WeakMap = require("../src/index"),
        object = {};

    describe("WeakMap#get(key)", function() {
        it("should return value at key, else returns undefined", function() {
            var a = new WeakMap();
            a.set(object, "value");
            assert.equal(a.get(object), "value");
        });
    });

    describe("WeakMap#set(key, value)", function() {
        it("should set value at key", function() {
            var a = new WeakMap();
            a.set(object, "value");
            assert.equal(a.get(object), "value");
        });
    });

    describe("WeakMap#has(key)", function() {
        it("should return true if map contains key", function() {
            var a = new WeakMap();
            a.set(object, "value");
            assert.equal(a.has(object), true);
        });
    });

    describe("WeakMap#remove(key)", function() {
        it("should remove value stored at key", function() {
            var a = new WeakMap();
            a.set(object, "value");
            a.remove(object);
            assert.equal(a.has(object), false);
        });
    });
});
