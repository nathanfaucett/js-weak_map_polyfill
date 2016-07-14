WeakMap
=======

WeakMap polyfill


```javascript
var WeakMap = require("@nathanfaucett/weak_map_polyfill");


var map = new WeakMap();
var key = {};

map.set(key, "value");
map.get(key); // "value"
````
