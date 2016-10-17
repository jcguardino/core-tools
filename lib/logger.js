var _ = require('lodash');
var moment = require('moment');

var Logger = function Constructor() {
};

Logger.prototype.log = function() {
	var text = arguments[0];

	if (arguments.length > 1) {
		var core = require('./core');
		text = core.string.format(text, _.values(arguments).slice(1));
	}

	text = moment().format('M/D @ HH:mm:ss') + ' - ' + text;
	console.log(text);
};

Logger.prototype.logFormat = function() {
	var pattern = arguments[0];
};

module.exports = Logger;
