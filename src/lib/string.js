const template = require('string-template');
const camelCasePkg = require('camel-case')
const pascalCasePkg = require('pascal-case');
const titleCasePkg = require('title-case');
const dashify = require('dashify');
const stringify = require('json-stringify-safe');

class String {
	constructor() {
	}

	format = (pattern, values) => {
		return template(pattern, values);
	};

	camelCase = str => {
		return camelCasePkg(str);
	};

	pascalCase = str => {
		return pascalCasePkg(str);
	};

	titleCase = str => {
		return titleCasePkg(str);
	};

	slugCase = (str, delimiter) => {
		str = dashify(str);
		if (delimiter) str = str.replace(/-/g, delimiter);
		return str;
	};

	dashCase = (str, delimiter) => {
		return this.slugCase(str, delimiter);
	};

	hyphenCase = (str, delimiter) => {
		return this.slugCase(str, delimiter);
	};

	ify = (obj, label) => {
		return (label ? label + ': ' : '') + stringify(obj);
	};

	ifypretty = (obj, label) => {
		return (label ? label + ': ' : '') + stringify(obj, null, 4);
	};

	ifyp = (obj, label) => {
		return this.ifypretty(obj, label);
	};

	json = (obj, label) => {
		return this.ifypretty(obj, label);
	};

	log = (obj, label) => {
		console.log((label ? label + ': ' : '') + this.ifypretty(obj));
	};

	labelLog = (label, obj) => {
		console.log(label + ': ' + ((typeof(obj) === 'string') ? obj : this.ifypretty(obj)));
	};
}

module.exports = new String();
