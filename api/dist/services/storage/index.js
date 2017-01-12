"use strict";
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
//   adapter(redis.createClient),
//   path(['storage', 'redis'])
// )
exports.storage = config => ramda_1.compose(adapters_1.adapter(fsAsync), ramda_1.path(['storage', 'json']))(config);
//# sourceMappingURL=index.js.map