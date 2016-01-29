'use strict';

var isCallable = require('es5-ext/object/is-callable')
  , isString   = require('es5-ext/string/is-string')
  , deferred   = require('deferred')
  , path       = require('path')
  , original   = require('fs').appendFile
  , mkdir      = require('./mkdir').mkdir

  , dirname = path.dirname, resolve = path.resolve;

var _appendFile = function (path, data, options, resolve, reject) {
	original(path, data, options, function (err) {
		var dir;
		if (err == null) {
			resolve(null);
			return;
		}
		if (!options.intermediate) {
			reject(err);
			return;
		}
		if (err.code !== 'ENOENT') {
			reject(err);
			return;
		}
		dir = dirname(path);
		if (dir === path) {
			reject(err);
			return;
		}
		mkdir(dir, { intermediate: true }).cb(function () {
			_appendFile(path, data, options, resolve, reject);
		}, reject);
	});
};
var appendFile = function (path, data, options) {
	var def = deferred();
	_appendFile(path, data, options, def.resolve, def.reject);
	return def.promise;
};
appendFile.returnsPromise = true;

module.exports = exports = function (path, data/*, options*/) {
	var cb, options;

	path = resolve(String(path));
	options = arguments[2];
	cb = arguments[3];
	if ((cb == null) && isCallable(options)) {
		cb = options;
		options = {};
	} else {
		options = isString(options) ? { encoding: options } : Object(options);
	}

	return appendFile(path, data, options).cb(cb);
};
exports.returnsPromise = true;
exports.appendFile = appendFile;
