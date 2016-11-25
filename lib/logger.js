var _ = require('lodash');
var moment = require('moment');
var String = require('./string');
var string = new String();

var Logger = function Constructor() {
};

Logger.prototype.log = function(text, values, options) {
	options = options || {};
	var logMessage = text;

	if (values) {
		logMessage = string.format(text, values);
	}

	var logText = string.format('{0} - {1}', [moment().format(options.dateFormat || 'M/D @ HH:mm:ss'), logMessage]);

	if (options.returnValue) {
		return logText;
	} else {
		console.log(logText);
	}
};

module.exports = Logger;
