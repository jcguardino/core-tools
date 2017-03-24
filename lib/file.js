const fs = require('fs');
const path = require('path');

class File {
	constructor() {
	}

	readdirRecursiveSync(rootDir, paths = []) {
		for (let file of fs.readdirSync(rootDir)) {
			let filePath = path.join(rootDir, file);
			if (fs.statSync(filePath).isDirectory()) {
				this.readdirRecursiveSync(filePath, paths);
			} else {
				paths.push(filePath);
			}
		}

		return paths;
	}

}

module.exports = new File();
