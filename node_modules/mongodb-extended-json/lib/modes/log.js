var moment = require('moment');

function toStrictQuotes(str) {
  return str
    // wrap field names in double quotes
    .replace(/([{,])\s*([^,{\s\'"]+)\s*:/g, '$1 "$2":');
}

function toStrictSimple(str) {
  return str
    // Timestamps
    .replace(/Timestamp (\d+)\|(\d+)/g, '{ "$timestamp": { "t": $1, "i": $2 } }')
    // MinKey
    .replace(/MinKey/g, '{ "$minKey": 1 }')
    // MaxKey
    .replace(/MaxKey/g, '{ "$maxKey": 1 }')
    // ObjectIds
    .replace(/ObjectId\('([0-9abcdef]{24})'\)/g, '{ "$oid": "$1" }');
}

function toStrictNumberLong(str) {
  var match = str.match(/\s\d{10,}/g);
  if (!match) {
    return str;
  }
  match.forEach(function(m) {
    var n = m.trim();
    if (+n > 2147483647) {
      str = str.replace(n, '{ "$numberLong": "' + n + '" }');
    }
  });
  return str;
}

function toStrictRegEx(str) {
  var regex = /([,:]\s*)\/(.+?)\/([gims]{0,4})(\s+)/g;
  var match;

  while ((match = regex.exec(str)) !== null) {
    var m2 = match[2].replace(/"/g, '"');
    str = str.replace(match[0], match[1] + '{ "$regex": "' + m2 + '", "$options": "'
      + match[3] + '" }' + match[4]);
  }
  return str;
}

function toStrictDate(str) {
  var regex = /new Date\((\d+)\)/g;
  var match;
  while ((match = regex.exec(str)) !== null) {
    var t = moment(parseInt(match[1], 10));
    str = str.replace(match[0], '{ "$date": "' + t.toISOString() + '" }');
  }
  return str;
}

function toStrictBinData(str) {
  var regex = /BinData\((\d+), ([0-9ABCDEF]+)\)/g;
  var match;
  while ((match = regex.exec(str)) !== null) {
    // convert hex to base64
    var hex = new Buffer(match[2], 'hex').toString('base64');
    str = str.replace(match[0], '{ "$binary": "' + hex + '", "$type": "' + match[1] + '" }');
  }
  return str;
}

module.exports.toStrict = function(str) {
  str = toStrictQuotes(str);
  str = toStrictSimple(str);
  str = toStrictNumberLong(str);
  str = toStrictRegEx(str);
  str = toStrictDate(str);
  str = toStrictBinData(str);
  return str;
};
