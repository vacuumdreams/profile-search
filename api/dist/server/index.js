"use strict";
const ramda_1 = require("ramda");
const restify_1 = require("restify");
const adapters_1 = require("./adapters");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
exports.api = config => ramda_1.compose(
// start,
ramda_1.tap(routes_1.addRoutes(routes_1.routes)), ramda_1.tap(middlewares_1.addMiddlewares(config, middlewares_1.middlewares)), adapters_1.adapter(restify_1.createServer))(config);
//# sourceMappingURL=index.js.map