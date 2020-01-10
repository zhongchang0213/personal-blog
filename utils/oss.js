const OSS = require('ali-oss');

const ossConfig = require('../config/oss');

let client = new OSS(ossConfig);

module.exports = client;
