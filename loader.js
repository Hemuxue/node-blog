const fs = require('fs');
const globalConfig = require('./config')

const controllerSet = [];
let pathMap = new Map();

//读文件名
let files = fs.readdirSync(globalConfig["web_path"]);

for (let i = 0; i < files.length; i++) {
	let temp = require(`./${globalConfig['web_path']}/${files[i]}`);
	if (temp.path) {
		for (let [key, value] of temp.path) {
			if (pathMap.get(key) == null) {
				pathMap.set(key, value);
			} else {
				throw new Error('url path 异常, url:' + key);
			}
		}
	}

}

module.exports = pathMap