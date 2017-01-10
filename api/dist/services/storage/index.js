"use strict";
const converge = require('ramda').converge;
const fs = require("fs");
//import * as redis from 'redis'
const bluebird_1 = require("bluebird");
const ramda_1 = require("ramda");
const adapters_1 = require("./adapters");
//promisifyAll(redis.RedisClient.prototype)
const fsAsync = {
    readFile: bluebird_1.promisify(fs.readFile)
};
// export const storage: (config: Config) => StorageSpec = compose(
//   redisAdapter(redis.createClient),
//   path(['storage', 'redis'])
// )
exports.storage = ramda_1.compose(adapters_1.adapter(fsAsync), ramda_1.path(['storage', 'json']));
//# sourceMappingURL=index.js.map