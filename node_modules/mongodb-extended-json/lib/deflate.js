var types = require('./types');
var strict = require('./modes/strict');
var isObject = types.isObject;
var async = require('async');
var raf = require('raf');

/**
 * Cast values from extended json objects to their BSON or JS types.
 *
 * @param {Any} data - A value which might be esjon encoded.
 * @return {Any}
 * @api private
 */
module.exports = function deflate(data) {
  if (Array.isArray(data)) {
    return data.map(deflate);
  }
  if (!isObject(data)) {
    return data;
  }

  var keys = Object.keys(data);
  if (keys.length === 0) {
    return data;
  }

  var caster = strict.deflate[keys[0]];
  if (!caster) {
    return keys.reduce(function(schema, key) {
      schema[key] = deflate(data[key]);
      return schema;
    }, {});
  }

  return caster(data);
};

function deflate_async(data, fn) {
  if (Array.isArray(data)) {
    async.series(data.map(function(doc) {
      return function(cb) {
        raf(function() {
          deflate_async(doc, cb);
        });
      };
    }), fn);
  } else if (!isObject(data)) {
    fn(null, data);
  } else {
    var keys = Object.keys(data);
    if (keys.length === 0) {
      fn(null, data);
    } else {
      var caster = strict.deflate[keys[0]];
      if (caster) {
        fn(null, caster.call(null, data));
      } else {
        var res = {};
        async.series(keys.map(function(key) {
          return function(cb) {
            deflate_async(data[key], function(err, d) {
              if (err) {
                return cb(err);
              }
              res[key] = d;
              cb();
            });
          };
        }), function(err) {
          if (err) {
            return fn(err);
          }
          fn(null, res);
        });
      }
    }
  }
}

module.exports.async = deflate_async;
