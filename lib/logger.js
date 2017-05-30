'use strict';
const log4js = require('log4js');

class Logger {
	constructor() {
		this.logger = log4js.getLogger();
	}

	configure(resource) {
		log4js.configure(resource);
	}

	setLevel(level) {
		this.logger.setLevel(level);
	}

	setDefaultLevel(level) {
		this.levelFunction = eval(level.toLowerCase());
	}

	trace(message) {
		this.logger.trace(message);
	}

	debug(message) {
		this.logger.debug(message);
	}

	info(message) {
		this.logger.info(message);
	}

	warn(message) {
		this.logger.warn(message);
	}

	error(message) {
		this.logger.error(message);
	}

	fatal(message) {
		this.logger.fatal(message);
	}

	log(message) {
		this.levelFunction ? this.levelFunction(message) : this.info(message);
	}
}

module.exports = new Logger();
