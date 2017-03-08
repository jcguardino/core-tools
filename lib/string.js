'use strict';

const template = require('string-template');
const trim = require('trim');
const camelCase = require('camel-case')
const pascalCase = require('pascal-case');
const titleCase = require('title-case');

class String {
	constructor() {
	}

	format(pattern, values) {
		return template(pattern, values);
	}

	trim(str) {
		return trim(str);
	};

	camelCase(str) {
		return camelCase(str);
	};

	pascalCase(str) {
		return pascalCase(str);
	};

	titleCase(str) {
		return titleCase(str);
	};

	ify(obj) {
		return JSON.stringify(obj);
	}

	ifypretty(obj) {
		return JSON.stringify(obj, null, '\t');
	}
}

module.exports = new String();
