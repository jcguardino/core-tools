'use strict';

const _ = require('lodash');
const fs = require('fs');
const nconf = require('nconf');

class Config {
	constructor() {
	}

	init(options) {
		console.log('Config: init');

		// Initialize nconf with environment variables
		nconf.argv().env();
		nconf.use('memory');

		// Create base settings object based on contents of base settings file
		let settings = (options.baseSettingsPath ? JSON.parse(fs.readFileSync(options.baseSettingsPath)) : {});

		if (options.envSettingsPath) {
			// Load environment-specific settings into envSettings
			const envSettings = JSON.parse(fs.readFileSync(options.envSettingsPath));

			// Get an array of the keys in envSettings
			const envKeys = _.keys(envSettings);

			// Loop through all of the envSettings keys and add their values to settings, replacing values if already existing;
			// this allows for the environment-specific settings file to take precedence over the defaults
			for (let i = 0; i < envKeys.length; i++) {
				settings[envKeys[i]] = envSettings[envKeys[i]];
			}
		}

		// Write the settings to nconf
		nconf.defaults(settings);
	}

	get(key) {
		return nconf.get(key);
	}

	set(key, value) {
		nconf.set(key, value);
	}

	getAll() {
		return nconf;
	}
}

module.exports = new Config();
