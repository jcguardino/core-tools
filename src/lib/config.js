const _ = require('lodash');
const fs = require('fs');
const nconf = require('nconf');

class Config {
	constructor() {
		// Initialize nconf with environment variables
		nconf.argv().env();
		nconf.use('memory');
	}

	init = (options = {}) => {
		// Create base settings object based on contents of base settings file
		let settings = (options.baseSettingsPath ? JSON.parse(fs.readFileSync(options.baseSettingsPath)) : {});

		if (options.envSettingsPath) {
			Object.assign(settings, JSON.parse(fs.readFileSync(options.envSettingsPath)));
		}

		Object.keys(settings).forEach(key => {
			this.set(key, settings[key]);
		});

		console.log(`Initialized config with ${Object.keys(settings).length} setting(s)`);
	};

	get = key => {
		return nconf.get(key);
	};

	getBoolean = key => {
		return this.get(key) === true;
	};

	set = (key, value) => {
		nconf.set(key, value);
	};

	getAll = () => {
		return nconf;
	};

	keyExists = key => {
		return this.get(key) !== undefined;
	};
}

module.exports = new Config();
