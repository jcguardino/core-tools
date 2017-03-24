'use strict';
const moment = require('moment');

class Logger {
	constructor() {
	}

	log(str, options = {}) {
		str = `${moment().format(options.dateFormat || 'M/D @ HH:mm:ss')} - ${str}`;

		if (options.returnValue) {
			return str;
		} else {
			console.log(str);
		}
	}

	error(err, details) {
		this.log(`ERROR: ${err} ${err.stack} ${err.details}`);
	}
}

module.exports = new Logger();
