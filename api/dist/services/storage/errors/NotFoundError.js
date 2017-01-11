"use strict";
const errors_1 = require("../../../errors");
class NotFoundError extends errors_1.HTTPError {
    constructor() {
        super();
        this.code = 500;
        this.msg = 'Data could not be found';
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map