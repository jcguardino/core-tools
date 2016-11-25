var stdio = require('stdio');
var crypto = require('crypto-js');

// Begin command line functions
var ops = stdio.getopt({
	'decrypt': {key: 'd'},
	'encrypt': {key: 'e'},
	'key': {key: 'k', args: 1}
});

if (ops.encrypt || ops.decrypt) {
	const readline = require('readline');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('String to encrypt/decrypt: ', function(answer) {
		var security = new Security();
		console.log('Using key: ' + (ops.key || 'default'));
		var result = ops.decrypt ?
			security.decryptString(answer, ops.key) :
			security.encryptString(answer, ops.key);
		console.log(result);
		rl.close();
	});
}
// End command line functions

var Security = function Constructor() {
};

Security.prototype.encryptString = function(str, key) {
	return crypto.AES.encrypt(str, key || (process.env.CORE_TOOLS_CRYPTO_KEY || 'Set default encryption salt here')).toString();
}

Security.prototype.decryptString = function(str, key) {
	return crypto.AES.decrypt(str, key || (process.env.CORE_TOOLS_CRYPTO_KEY || 'Set default encryption salt here')).toString(crypto.enc.Utf8);
}

module.exports = Security;
