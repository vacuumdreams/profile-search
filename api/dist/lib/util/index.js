"use strict";
exports.tryThrow = (fn, ErrorConstructor) => {
    try {
        return fn();
    }
    catch (e) {
        throw new ErrorConstructor();
    }
};
exports.successHandler = res => data => res.send(200, data);
exports.errorHandler = res => err => res.send(err.code || 500, err.msg || 'Something went wrong. Please try later');
//# sourceMappingURL=index.js.map