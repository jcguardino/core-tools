'use strict';

const config = require('./lib/config');
const exception = require('./lib/exception');
const file = require('./lib/file');
const logger = require('./lib/logger');
const security = require('./lib/security');
const string = require('./lib/string');

module.exports = {
	config,
	exception,
	error: exception, // alias
	file,
	logger,
	log: logger, // alias
	security,
	string
};
