"use strict";
const ramda_1 = require("ramda");
const restify_1 = require("restify");
const restify_2 = require("./adapters/restify");
const middlewares_1 = require("./middlewares");
const useMiddlewares = ramda_1.curry((config, server) => ramda_1.compose(server.use, middlewares_1.middlewares(config)));
// const addRoutes = 
exports.server = config => ramda_1.compose(useMiddlewares(config), restify_2.adapterRestify(restify_1.createServer))(config);
//# sourceMappingURL=index.js.map