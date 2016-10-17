var assert = require('assert');
var core = require('../core');

// config
core.config.init({
	baseSettingsPath: './test/resources/settings.json',
	envSettingsPath: './test/resources/settings-local.json',
});

assert.equal(core.config.get('myConfig'), 'config');
assert.equal(core.config.get('myConfig-overwrite'), 'overwrite');
assert.equal(core.config.get('myConfig-env'), 'env');

// string
assert.equal(core.string.format('{0}:{1}', 'key', 'value'), 'key:value');

// security
var encrypted = core.security.encryptString('test', 'key');
assert.equal(core.security.decryptString(encrypted, 'key'), 'test');

console.log('All tests passed');
