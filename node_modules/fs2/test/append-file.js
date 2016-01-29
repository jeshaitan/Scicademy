'use strict';

var fs      = require('fs')
  , resolve = require('path').resolve
  , rmdir   = require('../rmdir')

  , readFile = fs.readFile, unlink = fs.unlink

  , pgPath = resolve(__dirname, './__playground')
  , testFilePath = resolve(pgPath, 'append-file-test')
  , intermediateDirPath = resolve(pgPath, '_append-file')
  , intermediatePath = resolve(intermediateDirPath, 'intermediate/test');

module.exports = {
	Append: function (t, a, d) {
		t(testFilePath, 'raz', function (err) {
			a(err, null, '#1');
			t(testFilePath, 'dwa', function (err) {
				a(err, null, '#2');
				t(testFilePath, 'trzy', function (err) {
					a(err, null, '#3');
					readFile(testFilePath, function (err, content) {
						a(String(content), 'razdwatrzy', "Result");
						unlink(testFilePath, d);
					});
				});
			});
		});
	},
	Intermediate: function (t, a, d) {
		t(intermediatePath, 'elo', { intermediate: true }, function (err) {
			if (err) {
				d(err);
				return;
			}
			fs.readFile(intermediatePath, function (err, content) {
				if (err) {
					d(err);
					return;
				}
				a(String(content), 'elo', "Content");
				rmdir(intermediateDirPath, { recursive: true, force: true }, d);
			});
		});
	}
};
