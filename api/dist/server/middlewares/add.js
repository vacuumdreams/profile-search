"use strict";
const ramda_1 = require("ramda");
exports.addMiddlewares = ramda_1.curry((config, middlewares, { use }) => ramda_1.compose(use, middlewares)(config));
//# sourceMappingURL=add.js.map