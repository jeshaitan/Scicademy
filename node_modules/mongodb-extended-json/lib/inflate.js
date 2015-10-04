var strict = require('./modes/strict');
var types = require('./types');
var isObject = types.isObject;
var isFunction = require('lodash.isfunction');
var reduce = require('lodash.reduce');
var type = types.type;

function inflate_array(arr) {
  return arr.map(inflate.bind(null));
}

function inflate_reducer(res, val, key) {
  res[key] = inflate(val);
  return res;
}

function inflate_object(obj) {
  var value = obj;
  if (isFunction(obj.serialize)) {
    value = obj.serialize();
  }
  return reduce(value, inflate_reducer, {});
}

function inflate_primitive(value) {
  var t = type(value);
  if (strict.inflate.hasOwnProperty(t) === false) {
    return value;
  }

  var caster = strict.inflate[t];
  return caster(value);
}

/**
 * Format values with extra extended json type data.
 *
 * @param {Any} value - What to wrap as a `{$<type>: <encoded>}` object.
 * @return {Any}
 * @api private
 */
function inflate(value) {
  if (Array.isArray(value) === true) {
    return inflate_array(value);
  }
  if (isObject(value) === false) {
    return inflate_primitive(value);
  }
  return inflate_object(value);
}

module.exports = inflate;
