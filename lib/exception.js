'use strict';

const logger = require('./logger');

class Exception {
	constructor() {
	}

	handle (err, options) {
		if (!options || options.log === undefined || options.log === true) {
			logger.error(err, options ? options.details : null);
		}

		if (!options || options.notify === undefined || options.notify === true) {
			// Notify support team
		}

		if (options && options.response) {
			options.response.status(options.status || 500)
				.send('error')
				.end();
		}
	}
}

module.exports = new Exception();
