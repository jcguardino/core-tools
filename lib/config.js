var _ = require('lodash');
var fs = require('fs');
var nconf = require('nconf');
var format = require('string-format');
var path = require('path');
var config;

var Config = function(options) {
	if (options) {
		this.init(options);
	}
};

Config.prototype.init = function(options) {
	var env = process.env.SERVER_ENVIRONMENT || 'local';

	// Initialize nconf with environment variables
	nconf.argv().env();

	// Create base settings object based on contents of base settings file
	var settings = (options.baseSettingsPath ? JSON.parse(fs.readFileSync(path.join(__dirname, '/..', options.baseSettingsPath))) : {});

	if (options.envSettingsPath) {
		// Load environment-specific settings into envSettings
		var envSettings = JSON.parse(fs.readFileSync(path.join(__dirname, '/..', options.envSettingsPath)));

		// Get an array of the keys in envSettings
		var envKeys = _.keys(envSettings);

		// Loop through all of the envSettings keys and add their values to settings, replacing values if already existing;
		// this allows for the environment-specific settings file to take precedence over the defaults
		for (var i = 0; i < envKeys.length; i++) {
			settings[envKeys[i]] = envSettings[envKeys[i]];
		}
	}

	// Write the settings to nconf
	nconf.defaults(settings);

	// Copy nconf to static cachedNconf
	this.cachedNconf = nconf;
	config = this;
};

Config.prototype.get = function(key) {
	return getConfig().cachedNconf.get(key);
};

Config.prototype.set = function(key, value) {
	return getConfig().cachedNconf.set(key, value);
};

Config.prototype.getAll = function() {
	return getConfig().cachedNconf;
};

module.exports = Config;

function getConfig() {
	if (config) {
		return config;
	} else {
		throw {
			name: 'UninitializedConfig',
			message: 'Function called on uninitialized config'
		}
	}
}
