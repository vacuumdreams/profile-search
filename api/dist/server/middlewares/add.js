"use strict";
const ramda_1 = require("ramda");
exports.addMiddlewares = ramda_1.curry((config, middlewares, adapter) => ramda_1.compose(adapter.use, middlewares)(config));
//# sourceMappingURL=add.js.map