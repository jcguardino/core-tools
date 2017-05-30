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

	ify(obj) {
		return circular.stringify(obj);
	}

	ifypretty(obj) {
		return circular.stringify(obj, null, '\t');
	}

	ifyp(obj) {
		return this.ifypretty(obj);
	}

	json(obj) {
		return this.ifypretty(obj);
	}

	log(obj) {
		console.log(this.ifypretty(obj));
	}
}

module.exports = new String();
