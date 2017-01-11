"use strict";
const errors_1 = require("../../../errors");
class BadDataError extends errors_1.HTTPError {
    constructor() {
        super();
        this.code = 500;
        this.msg = 'Data is corrupted, error in processing';
    }
}
exports.BadDataError = BadDataError;
//# sourceMappingURL=BadDataError.js.map