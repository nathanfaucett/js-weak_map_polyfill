var tape = require("tape"),
    WeakMapPolyfill;


var object = {};


global.WeakMap = undefined;
WeakMapPolyfill = require("..");


tape("WeakMap#get(key: Object) should return value at key, else returns undefined", function(assert) {
    var a = new WeakMapPolyfill();
    a.set(object, "value");
    assert.equal(a.get(object), "value");
    assert.end();
});

tape("WeakMap#set(key: Object, value: Any) should set value at key", function(assert) {
    var a = new WeakMapPolyfill();
    a.set(object, "value");
    assert.equal(a.get(object), "value");
    assert.end();
});

tape("WeakMap#has(key: Object) should return true if map contains key", function(assert) {
    var a = new WeakMapPolyfill();
    a.set(object, "value");
    assert.equal(a.has(object), true);
    assert.end();
});

tape("WeakMap#remove(key: Object) should remove value stored at key", function(assert) {
    var a = new WeakMapPolyfill();
    a.set(object, "value");
    a.remove(object);
    assert.equal(a.has(object), false);
    assert.end();
});
