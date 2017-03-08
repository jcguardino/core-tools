'use strict';

const logger = require('./logger');

class Exception {
	constructor() {
	}

	handle(err, options = {}) {
		if (options.log === true) {
			logger.error(err, options.details);
		}

		if (options.notify === true) {
			// Notify support team
		}

		if (options.response) {
			options.response.status(options.status || 500)
				.send('error')
				.end();
		}
	}
}

module.exports = new Exception();
