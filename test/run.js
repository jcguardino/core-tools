const assert = require('assert');
const core = require('../core');

// config
core.config.init({
	baseSettingsPath: './test/resources/settings.json',
	envSettingsPath: './test/resources/settings-local.json',
});

assert.equal(core.config.get('myConfig'), 'config');
assert.equal(core.config.get('myConfig-overwrite'), 'overwrite');
assert.equal(core.config.get('myConfig-env'), 'env');

// config-set
core.config.set('test-config', 'config');
assert.equal(core.config.get('test-config'), 'config');

// string
assert.equal(core.string.format('the value is {0}.', 'value'), 'the value is value.');
assert.equal(core.string.format('{0}:{1}', ['key', 'value']), 'key:value');
assert.equal(core.string.format('{0}:{1}:{2}', ['key', 'value1', 'value2']), 'key:value1:value2');
assert.equal(core.string.camelCase('abc-def'), 'abcDef');
assert.equal(core.string.pascalCase('abc-def'), 'AbcDef');

// security
const encrypted = core.security.encryptString('test', 'key');
assert.equal(core.security.decryptString(encrypted, 'key'), 'test');

// logger
const logText = core.logger.log('ok', {returnValue: true});
assert.ok(/\d+\/\d+ @ \d+:\d+:\d+ - ok/.exec(logText));

console.log('All tests passed');
