var format = require('util').format;

function toStrictQuotes(str) {
  return str
    // replace single quotes with double quotes
    .replace(/'/g, '"')
    // wrap field names in double quotes
    .replace(/([{,])\s*([^,{\s\'"]+)\s*:/g, '$1 "$2":');
}

function toStrictSimple(str) {
  return str
    // Timestamps
    .replace(/Timestamp\((\d+), (\d+)\)/g, '{ "$timestamp": { "t": $1, "i": $2 } }')

    // MinKey and MaxKey are erroneously already printed in strict json format
    // @see https://jira.mongodb.org/browse/SERVER-19171
    // .replace(/MinKey/g, '{ "$minKey": 1 }')
    // .replace(/MaxKey/g, '{ "$maxKey": 1 }')

    // ObjectIds
    .replace(/ObjectId\("([0-9abcdef]{24})"\)/g, '{ "$oid": "$1" }')
    // NumberLong
    .replace(/NumberLong\(([0-9]+)\)/g, '{ "$numberLong": "$1" }')
    // Date also prints the wrong format,
    // @see https://jira.mongodb.org/browse/SERVER-19171
    .replace(/ISODate\("(.+?)"\)/g, '{ "$date": "$1" }')
    // DBRef
    .replace(/DBRef\("(.+?)", "(.+?)"\)/g, '{ "$ref": "$1", "$id": "$2" }')
    // undefined, shell is buggy here too,
    // @see https://jira.mongodb.org/browse/SERVER-6102
    .replace('undefined', '{ "$undefined": true }');
}


function toStrictRegEx(str) {
  var regex = /([,:]\s*)\/(.+?)\/([gims]{0,4})(\s+)/g;
  var match;

  while ((match = regex.exec(str)) !== null) {
    var m2 = match[2].replace(/"/g, '"');
    str = str.replace(match[0], format(
      '%s{ "$regex": "%s", "$options": "%s" }%s',
      match[1], m2, match[3], match[4]));
  }
  return str;
}

function toStrictBinData(str) {
  var regex = /BinData\((\d+),"(.+?)"\)/g;
  var match;
  while ((match = regex.exec(str)) !== null) {
    var hex = parseInt(match[1], 10).toString(16);
    str = str.replace(match[0], '{ "$binary": "' + match[2] + '", "$type": "' + hex + '" }');
  }
  return str;
}

module.exports.toStrict = function(str) {
  str = toStrictQuotes(str);
  str = toStrictSimple(str);
  str = toStrictRegEx(str);
  str = toStrictBinData(str);
  return str;
};

/**
 * Below definitions are currently not used, stringification back to shell mode
 * is not yet supported. We leave them here for future reference though.
 */
module.exports.inflate = {
  ObjectID: function(v) {
    return format('ObjectId("%s")', v.toString());
  },
  Timestamp: function(v) {
    return format('Timestamp(%d, %d)', v.low_, v.high_);
  },
  MinKey: function(v) {
    return v;
  },
  MaxKey: function(v) {
    return v;
  },
  NumberLong: function(v) {
    return format('NumberLong(%d)', v);
  },
  Date: function(v) {
    return format('ISODate("%s")', v.toISOString());
  },
  DBRef: function(v) {
    return format('DBRef("%s", "%s")', v.namespace, v.oid.toString());
  },
  Undefined: function() {
    return 'undefined';
  },
  RegExp: function(v) {
    var o = '';

    if (v.global) {
      o += 'g';
    }
    if (v.ignoreCase) {
      o += 'i';
    }
    if (v.multiline) {
      o += 'm';
    }
    return format('/%s/%s', v.source, o);
  },
  Binary: function(v) {
    return format('BinData(%s, "%s")', v.sub_type.toString(10), v.buffer.toString('base64'));
  }
};
