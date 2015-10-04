var strict = require('./modes/strict');

var OBJECT_REGEX = /\[object (\w+)\]/;
/**
 * Gets the BSON or JS type of a value.
 *
 * @param {Any} value - Value to check.
 * @return {String}
 * @api private
 */
module.exports.type = function type(value) {
  if (value && value._bsontype) {
    return value._bsontype;
  }
  return OBJECT_REGEX.exec(Object.prototype.toString.call(value))[1];
};

/**
 * @api private
 */
module.exports.special = {
  types: Object.keys(strict.inflate),
  keys: Object.keys(strict.deflate)
};

/**
 * @param {Any} value - Value to check.
 * @return {Boolean}
 * @api private
 */
module.exports.isSpecial = function isSpecial(value) {
  return module.exports.special.types.indexOf(module.exports.type(value)) > -1;
};

/**
 * @param {Any} value - Value to check.
 * @return {Boolean}
 * @api private
 */
module.exports.isObject = function isObject(value) {
  return module.exports.type(value) === 'Object';
};
