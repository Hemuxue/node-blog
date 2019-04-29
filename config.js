const fs = require('fs');

const globalConfig  = {};

const conf = fs.readFileSync("./server.conf");

const configArr = conf.toString().split("\n");

for(let i = 0 ; i < configArr.length; i++) {
    const tempArr = configArr[i].split('=')
    globalConfig[tempArr[0].trim()] = tempArr[1].trim();
}


module.exports  = globalConfig;