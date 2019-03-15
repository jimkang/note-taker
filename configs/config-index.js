/* global __dirname */
var fs = require('fs');

var files = fs.readdirSync(__dirname).filter(isAConfigFile);
var configs = files.map(file => require(__dirname + '/' + file));

function isAConfigFile(filename) {
  return filename.endsWith('-config.js');
}

module.exports = configs;
