var Config = require('./lib/config');
var Security = require('./lib/security');
var Logger = require('./lib/logger');
var String = require('./lib/string');

var Core = {
	config: new Config(),
	security: new Security(),
	logger: new Logger(),
	string: new String()
};

module.exports = Core;
