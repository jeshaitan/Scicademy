var types = require('./types');
var deflate = require('./deflate');

/**
 * Similar to [object_hook][object_hook] in python, ES5 JSON.parse accepts
 * a very not well-known [reviver][reviver] argument.  This can be used to
 * easily plug in to existing middleware like [body-parser][body-parser]
 * for express:
 *
 *  ```javascript
 *  var EJSON = require('mongodb-extended-json'),
 *   bodyParser = require('body-parser'),
 *   app = require('express')();
 *
 * app.post('/save', bodyParser.json({reviver: EJSON.reviver}), function(req, res){
 *   console.log('omg now it has extended types', req.body);
 *   // Do stuff
 * });
 *  ```
 *
 * [object_hook]: https://docs.python.org/2/library/json.html#json.load
 * [reviver]: http://mdn.io/json.parse#Example.3A_Using_the_reviver_parameter
 * [body-parser]: http://npm.im/body-parser
 *
 * @param {String} k - The key in the object.
 * @param {Any} v - Contents of `k`.
 * @return {Any}
 */
module.exports = function reviver(k, v) {
  if (!types.isObject(v)) {
    return v;
  }
  var firstKey = Object.keys(v)[0];

  if (!firstKey || types.special.keys.indexOf(firstKey) === -1) {
    return v;
  }
  return deflate(v);
};
