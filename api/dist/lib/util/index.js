"use strict";
const curry = require('ramda').curry;
exports.toArg = index => (...rest) => rest[index];
exports.toTimestamp = value => new Date(value).getTime();
exports.alwaysThrow = ErrorConstructor => err => {
    throw new ErrorConstructor();
};
exports.tryThrow = (fn, ErrorConstructor) => {
    let b;
    try {
        b = fn();
    }
    catch (e) {
        throw new ErrorConstructor();
    }
    return b;
};
exports.successHandler = res => data => res.send(200, data);
exports.errorHandler = res => err => res.send(err.code || 500, err.msg || 'Something went wrong, please try later');
//# sourceMappingURL=index.js.map