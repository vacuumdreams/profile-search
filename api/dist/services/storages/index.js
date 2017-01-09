"use strict";
const fs = require("fs");
const redis = require("redis");
const bluebird_1 = require("bluebird");
const ramda_1 = require("ramda");
const adapters_1 = require("./adapters");
bluebird_1.promisify(redis.RedisClient.prototype.get);
const fsAsync = {
    readFile: bluebird_1.promisify(fs.readFile)
};
exports.storages = ramda_1.applySpec({
    json: ramda_1.compose(adapters_1.jsonAdapter(fsAsync), ramda_1.path(['storage', 'json'])),
    redis: ramda_1.compose(adapters_1.redisAdapter(redis.createClient), ramda_1.path(['storage', 'redis']))
});
//# sourceMappingURL=index.js.map