const stdio = require('stdio');
const crypto = require('crypto-js');

// Begin command line functions
const ops = stdio.getopt({
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

	rl.question('String to encrypt/decrypt: ', (answer) => {
		const security = new Security();
		console.log('Using key: ' + (ops.key || 'default'));
		const result = ops.decrypt ?
			security.decryptString(answer, ops.key) :
			security.encryptString(answer, ops.key);
		console.log(result);
		rl.close();
	});
}
// End command line functions

class Security {
	constructor() {
	}

	encryptString = (str, key) => {
		return crypto.AES.encrypt(str, key || (process.env.CORE_TOOLS_CRYPTO_KEY || 'Set default encryption salt here')).toString();
	};

	decryptString = (str, key) => {
		return crypto.AES.decrypt(str, key || (process.env.CORE_TOOLS_CRYPTO_KEY || 'Set default encryption salt here')).toString(crypto.enc.Utf8);
	};
}

module.exports = new Security();
