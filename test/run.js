const assert = require('assert');
const core = require('../dist/core');

console.log('IMPORTANT: Make sure you have run *npm run build* before running these tests');

// config-uninitialized
core.config.set('key1', 'value1');
assert.equal(core.config.get('key1'), 'value1');

// config-init
core.config.init({
	baseSettingsPath: './test/resources/settings.json',
	envSettingsPath: './test/resources/settings-local.json'
});

// config-get
assert.equal(core.config.get('myConfig'), 'config');
assert.equal(core.config.get('myConfig-overwrite'), 'overwrite');
assert.equal(core.config.get('myConfig-env'), 'env');
assert.equal(core.config.get('key1'), 'newvalue1');

// config-set
core.config.set('test-config', 'config');
assert.equal(core.config.get('test-config'), 'config');

// config-getBoolean
core.config.set('boolean-config-true', true);
core.config.set('boolean-config-false', false);
core.config.set('boolean-config-string', 'test');
assert.equal(core.config.getBoolean('boolean-config-true'), true);
assert.equal(core.config.getBoolean('boolean-config-false'), false);
assert.equal(core.config.getBoolean('boolean-config-string'), false);
assert.equal(core.config.getBoolean('boolean-config-undefined'), false);

// config-keyExists
assert.equal(core.config.keyExists('test-config'), true);
assert.equal(core.config.keyExists('fake-config'), false);

// string
assert.equal(core.string.format('the value is {0}.', 'value'), 'the value is value.');
assert.equal(core.string.format('{0}:{1}', ['key', 'value']), 'key:value');
assert.equal(core.string.format('{0}:{1}:{2}', ['key', 'value1', 'value2']), 'key:value1:value2');
assert.equal(core.string.camelCase('abc-def'), 'abcDef');
assert.equal(core.string.pascalCase('abc-def'), 'AbcDef');
assert.equal(core.string.slugCase('AbcDefGhi XYZ'), 'abc-def-ghi-xyz');
assert.equal(core.string.slugCase('AbcDefGhi XYZ', '_'), 'abc_def_ghi_xyz');
assert.equal(core.string.ify({x: 'value-x', y: {z: 'value-z'}}), '{"x":"value-x","y":{"z":"value-z"}}');
core.string.log({ a: 1, b: 'c' }, 'x');
core.string.labelLog('mylabel', 'myvalue');
core.string.labelLog('mylabel', { a: 1, b: 'c' });
console.log(core.string.ifypretty({ a: 1, b: 2 }));

// security
let encrypted = core.security.encryptString('test', 'key');
assert.equal(core.security.decryptString(encrypted, 'key'), 'test');

encrypted = core.security.encryptString('test', '3210fd35584fb84106cffad607094cc1', 'aes-128-ecb');
assert.equal(core.security.decryptString(encrypted, '3210fd35584fb84106cffad607094cc1', 'aes-128-ecb'), 'test');

// logger
core.logger.log('ok'); // Should be INFO
core.logger.trace('ok');
core.logger.setLevel('INFO');
core.logger.debug('ok'); // This shouldn't output anything since DEBUG is lower than INFO
core.logger.warn('ok'); // But this should log to the console since WARN is higher than INFO

// exception
core.exception.setOptions({
	log: false,
	notify: exceptionCallback
});

core.exception.handle(new Error('test error #1'));
assert(core.exception.flatten(new Error('test error #1')).startsWith('test error #1:  Error: test error'));

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
const files = core.file.readdirRecursiveSync(__dirname, { fullPath: true, filter: ['filterme.js'] });

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
