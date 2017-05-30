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
console.log(core.string.ifypretty({a: 1, b: 2}));

// security
const encrypted = core.security.encryptString('test', 'key');
assert.equal(core.security.decryptString(encrypted, 'key'), 'test');

// logger
core.logger.log('ok'); // Should be INFO
core.logger.trace('ok');
core.logger.setLevel('INFO');
core.logger.debug('ok'); // This shouldn't output anything since DEBUG is lower than INFO
core.logger.warn('ok'); // But this should log to the console since WARN is higher than INFO

// exception
core.exception.setOptions({
	notify: exceptionCallback
});

core.exception.handle(new Error('test error #1'));

function exceptionCallback(err) {
	assert.equal(err.toString(), 'Error: test error #1');
}

core.exception.handle(new Error('test error #2'), {
	notify: exceptionCallback2
});

function exceptionCallback2(err) {
	assert.equal(err.toString(), 'Error: test error #2');
}

core.exception.handle(new Error('test error #1'));

// file
const files = core.file.readdirRecursiveSync(__dirname, {fullPath: true, filter: ['filterme.js']});

const searchFilePatterns = [/settings-local\.json/, /settings\.json/, /run\.js/];
let foundCount = 0;

for (let pattern of searchFilePatterns) {
	for (let file of files) {
		if (pattern.test(file)) {
			foundCount++;
		}
	}
}

assert.equal(foundCount, searchFilePatterns.length, 'Expected file(s) not returned from file.readdirRecursiveSync()');

console.log('All tests passed');
