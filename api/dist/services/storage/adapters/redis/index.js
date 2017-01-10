"use strict";
exports.redisAdapter = redis => config => {
    const storage = {
        name: 'redis',
        type: 'storage',
        store: {}
    };
    return storage;
    // return compose(
    //   // applySpec({
    //   //   get: prop('getAsync'),
    //   // }),
    //   tap(console.log.bind(console)),
    //   redis
    // )(config)
};
//# sourceMappingURL=index.js.map