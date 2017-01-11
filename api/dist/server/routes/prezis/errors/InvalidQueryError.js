"use strict";
const errors_1 = require("../../../../errors");
class InvalidQueryError extends errors_1.HTTPError {
    constructor() {
        super();
        this.code = 400;
        this.msg = 'Request query is invalid';
    }
}
exports.InvalidQueryError = InvalidQueryError;
//# sourceMappingURL=InvalidQueryError.js.map