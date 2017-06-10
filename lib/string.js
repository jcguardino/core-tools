'use strict';

const template = require('string-template');
const trim = require('trim');
const camelCase = require('camel-case')
const pascalCase = require('pascal-case');
const titleCase = require('title-case');
const circular = require('circular-json');

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

	ify(obj, label) {
		return (label ? label + ': ' : '') + circular.stringify(obj);
	}

	ifypretty(obj, label) {
		return (label ? label + ': ' : '') + circular.stringify(obj, null, '\t');
	}

	ifyp(obj, label) {
		return this.ifypretty(obj, label);
	}

	json(obj, label) {
		return this.ifypretty(obj, label);
	}

	log(obj, label) {
		console.log((label ? label + ': ' : '') + this.ifypretty(obj));
	}

	labelLog(label, obj) {
		console.log(label + ': ' + ((typeof(obj) === 'string') ? obj : this.ifypretty(obj)));
	}
}

module.exports = new String();
