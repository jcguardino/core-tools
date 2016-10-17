var _ = require('lodash');
var stringFormat = require('string-format');
var trim = require('trim');
var camelCase = require('camel-case')
var pascalCase = require('pascal-case');
var titleCase = require('title-case');

var String = function Constructor() {
};

String.prototype.format = function() {
	var core = require('../core');
	var values = {};
	var pattern = arguments[0].toString().replace(/\{{1}(\d+)\}{1}/g, '{arg$1}');
	var patternArgs = _.cloneDeep(arguments);

	if (arguments.length > 1) {
		// This is needed because null values disappear from arguments though the length of arguments doesn't change
		for (var i = 0; i < arguments.length; i++) {
			if (!arguments[i]) {
				patternArgs[i] = ''; // Insert an empty string into the cloned arguments
			}
		}

		// If there is just one argument, it will be at position 0; otherwise, the args are values in a JSON object
		var args = (typeof patternArgs[1] === 'string') ? _.values(patternArgs).slice(1) : patternArgs[1];

		for (var i = 0; i < args.length; i++) {
			values['arg' + i] = args[i];
		}
	}

	return stringFormat(pattern, values);
};

String.prototype.trim = function(str) {
	return trim(str);
};

String.prototype.camelCase = function(str) {
	return camelCase(str);
};

String.prototype.pascalCase = function(str) {
	return pascalCase(str);
};

String.prototype.titleCase = function(str) {
	return titleCase(str);
};

String.prototype.ify = function(obj) {
	return JSON.stringify(obj);
}

String.prototype.ifypretty = function(obj) {
	return JSON.stringify(obj, null, '\t');
}

module.exports = String;
