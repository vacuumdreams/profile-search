"use strict";
const ramda_1 = require("ramda");
exports.create = (path, handlers) => ramda_1.applySpec({
    path: ramda_1.always(path),
    handlers,
});
//# sourceMappingURL=create.js.map