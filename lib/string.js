var _ = require('lodash');
var stringFormat = require('string.format');
var trim = require('trim');
var camelCase = require('camel-case')
var pascalCase = require('pascal-case');
var titleCase = require('title-case');

var String = function Constructor() {
};

String.prototype.format = function() {
	if (typeof arguments[1] === 'string') {
		arguments[1] = [arguments[1]];
	}

	return arguments[0].format(arguments[1]);
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
