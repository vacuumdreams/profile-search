"use strict";
const errors_1 = require("../../../../errors");
class InvalidSortParamError extends errors_1.HTTPError {
    constructor() {
        super();
        this.code = 400;
        this.msg = 'Cannot sort on the provided property';
    }
}
exports.InvalidSortParamError = InvalidSortParamError;
//# sourceMappingURL=InvalidSortParamError.js.map