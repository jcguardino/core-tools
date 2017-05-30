'use strict';

const logger = require('./logger');

class Exception {
	constructor() {
	}

	setOptions(defaultOptions) {
		this.defaultOptions = defaultOptions;
	}

	handle(err, options) {
		if (!options || Object.keys(options).length === 0) {
			options = this.defaultOptions;
		} else {
			if (this.defaultOptions) {
				options = Object.assign({}, this.defaultOptions, options);
			}
		}

		if (err && options.log !== false) {
			logger.error(err.stack || err.message);
		}

		if (options.notify) {
			options.notify(err);
		}

		if (options.response) {
			options.response.status(options.status || 500)
				.send('error')
				.end();
		}
	}
}

module.exports = new Exception();
