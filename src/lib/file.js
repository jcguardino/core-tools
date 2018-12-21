const fs = require('fs');
const path = require('path');

class File {
	constructor() {
	}

	readdirRecursiveSync = (rootDir, options = {}, currentDir = '', paths = []) => {
		for (let file of fs.readdirSync(rootDir)) {
			let filePath = path.join(rootDir, file);
			if (fs.statSync(filePath).isDirectory()) {
				this.readdirRecursiveSync(filePath, options, `${currentDir}${file}/`, paths);
			} else if (!options.filter || !options.filter.includes(file)) {
				paths.push(options.fullPath === true ? filePath : `${currentDir}${file}`);
			}
		}

		return paths;
	}

}

module.exports = new File();
