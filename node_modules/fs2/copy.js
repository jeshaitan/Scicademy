// Copy file
// Credit: Isaac Schlueter
// http://groups.google.com/group/nodejs/msg/ef4de0b516f7d5b8

'use strict';

var isCallable       = require('es5-ext/object/is-callable')
  , normalizeOptions = require('es5-ext/object/normalize-options')
  , d                = require('d')
  , deferred         = require('deferred')
  , fs               = require('fs')
  , path             = require('path')
  , mkdir            = require('./mkdir')

  , hasOwnProperty = Object.prototype.hasOwnProperty, defineProperty = Object.defineProperty
  , dirname = path.dirname, resolve = path.resolve
  , createReadStream = fs.createReadStream, createWriteStream = fs.createWriteStream
  , stat = fs.stat;

var fixOptions = function (options) {
	if (options.hasOwnProperty) return options;
	return defineProperty(options, 'hasOwnProperty', d(hasOwnProperty));
};

var copyWithMode = function (def, source, dest, options) {
	var read, write;

	try {
		read = createReadStream(source);
	} catch (e) {
		return def.reject(e);
	}
	read.on('error', function (e) {
		write.destroy();
		def.reject(e);
	});

	try {
		write = createWriteStream(dest, fixOptions(options));
	} catch (e1) {
		read.destroy();
		return def.reject(e1);
	}

	write.on('error', function (e) {
		read.destroy();
		if ((e.code === 'ENOENT') && options.intermediate) {
			mkdir(dirname(resolve(dest)), { intermediate: true }).done(function () {
				options = normalizeOptions(options);
				delete options.intermediate;
				return copyWithMode(def, source, dest, options);
			}, def.reject);
			return;
		}
		def.reject(e);
	});
	read.pipe(write);
	write.on('close', def.resolve);

	return def.promise;
};

var copy = function (source, dest, options) {
	var def = deferred();
	if (options.mode) {
		copyWithMode(def, source, dest, options);
		return def.promise;
	}
	stat(source, function (e, stats) {
		if (e) {
			def.reject(e);
			return;
		}
		options = normalizeOptions(options);
		options.mode = stats.mode;
		copyWithMode(def, source, dest, options);
	});
	return def.promise;
};
copy.returnsPromise = true;

module.exports = exports = function (source, dest/*, options, cb*/) {
	var options = Object(arguments[2]), cb = arguments[3];
	if ((cb == null) && isCallable(options)) {
		cb = options;
		options = {};
	}

	return copy(String(source), String(dest), options).cb(cb);
};
exports.copy = copy;
exports.returnsPromise = true;
