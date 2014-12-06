global.WeakMap = require("../src/index");


global.map = new WeakMap();


var object = {},
    array = [];

map.set(object, "{}");
map.set(array, "[]");

console.log(
    map.get(object),
    map.get(array)
);
