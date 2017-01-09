"use strict";
const ramda_1 = require("ramda");
exports.redisAdapter = redis => config => {
    return {};
    return ramda_1.compose(ramda_1.applySpec({
        get: redis.getAsync,
    }), redis)(config);
};
//# sourceMappingURL=index.js.map