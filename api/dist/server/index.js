"use strict";
const ramda_1 = require("ramda");
const restify_1 = require("restify");
const adapters_1 = require("./adapters");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const start = (msg) => ramda_1.compose(ramda_1.flip(ramda_1.call)(msg), ramda_1.prop('start'));
exports.api = config => ramda_1.compose(ramda_1.tap(start('Server listening')), ramda_1.tap(routes_1.addRoutes(routes_1.routes)), ramda_1.tap(middlewares_1.addMiddlewares(config, middlewares_1.middlewares)), adapters_1.adapter(restify_1.createServer))(config);
//# sourceMappingURL=index.js.map