# mongodb-extended-json [![][npm_img]][npm_url] [![][travis_img]][travis_url] [![][coverage_img]][coverage_url] [![][gitter_img]][gitter_url]

> [MongoDB Extended JSON][ejson] parse and stringify that is friendly with
> [bson][bson] and is actually compliant with the [kernel][json_cpp].

## Example

```javascript
var EJSON = require('mongodb-extended-json');
var BSON = require('bson');

var doc = {
  _id: BSON.ObjectID(),
  last_seen_at: new Date(),
  display_name: undefined
};

console.log('Doc', doc);
// > Doc { _id: 53c2ab5e4291b17b666d742a, last_seen_at: Sun Jul 13 2014 11:53:02 GMT-0400 (EDT), display_name: undefined }

console.log('JSON', JSON.stringify(doc));
// > JSON {"_id":"53c2ab5e4291b17b666d742a","last_seen_at":"2014-07-13T15:53:02.008Z"}

console.log('EJSON', EJSON.stringify(doc));
// > EJSON {"_id":{"$oid":"53c2ab5e4291b17b666d742a"},"last_seen_at":{"$date":1405266782008},"display_name":{"$undefined":true}}

// And likewise, EJSON.parse works just as you would expect.
EJSON.parse('{"_id":{"$oid":"53c2ab5e4291b17b666d742a"},"last_seen_at":{"$date":1405266782008},"display_name":{"$undefined":true}}');
// { _id: 53c2ab5e4291b17b666d742a,
//   last_seen_at: Sun Jul 13 2014 11:53:02 GMT-0400 (EDT),
//  display_name: undefined }
```

### Streams

```javascript
var request = require('request');
var url = 'https://cdn.rawgit.com/imlucas/mongodb-extended-json/master/test/data.json';
var EJSON = require('./');
var util = require('util');
var es = require('event-stream');

request.get(url)
  .pipe(EJSON.createParseStream('*'))
  .pipe(es.through(function(doc){
    this.emit('data',
      util.format('_id `%s` has timestamp %s\n', doc._id, doc._id.getTimestamp()));
  }))
  .pipe(process.stdout);

// Prints out:
//
// _id `54a1e4c798c1120000bb8b0f` has timestamp Mon Dec 29 2014 18:33:27 GMT-0500 (EST)
// _id `54a1e42f94042000008ac2f3` has timestamp Mon Dec 29 2014 18:30:55 GMT-0500 (EST)
// _id `54a1e3e68f038b0000631fe2` has timestamp Mon Dec 29 2014 18:29:42 GMT-0500 (EST)
// _id `54a1e3bc124968000052af15` has timestamp Mon Dec 29 2014 18:29:00 GMT-0500 (EST)
// _id `54a1e3a8124968000052af14` has timestamp Mon Dec 29 2014 18:28:40 GMT-0500 (EST)
// _id `54a1e2117b93d000002ee9bb` has timestamp Mon Dec 29 2014 18:21:53 GMT-0500 (EST)
// _id `54a1e1d6360382000019c110` has timestamp Mon Dec 29 2014 18:20:54 GMT-0500 (EST)
// _id `54a1e12ea5a5bb0000561dda` has timestamp Mon Dec 29 2014 18:18:06 GMT-0500 (EST)
// _id `54a1e0c14f3dc50000ba1afc` has timestamp Mon Dec 29 2014 18:16:17 GMT-0500 (EST)
// _id `54a1df90edbfd100001943b3` has timestamp Mon Dec 29 2014 18:11:12 GMT-0500 (EST)

```

[ejson]: http://docs.mongodb.org/manual/reference/mongodb-extended-json/
[bson]: http://github.com/mongodb/js-bson
[json_cpp]: https://github.com/mongodb/mongo/blob/master/src/mongo/db/json.cpp
[travis_img]: https://secure.travis-ci.org/mongodb-js/extended-json.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/extended-json
[npm_img]: https://img.shields.io/npm/v/mongodb-extended-json.svg
[npm_url]: https://www.npmjs.org/package/mongodb-extended-json
[coverage_img]: https://coveralls.io/repos/mongodb-js/extended-json/badge.svg
[coverage_url]: https://coveralls.io/r/mongodb-js/extended-json
[gitter_img]: https://badges.gitter.im/Join%20Chat.svg
[gitter_url]: https://gitter.im/mongodb-js/mongodb-js
