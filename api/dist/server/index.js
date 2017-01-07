"use strict";
const ramda_1 = require("ramda");
const restify_1 = require("restify");
const restify_2 = require("./adapters/restify");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const useMiddlewares = ramda_1.curry((config, server) => ramda_1.compose(server.use, middlewares_1.middlewares(config)));
const addRoutes = server => {
    console.log(routes_1.routes);
};
// const start = compose(
//   flip(call)(),
//   path(['start'])
// )
exports.server = config => ramda_1.compose(
// start,
ramda_1.tap(addRoutes), ramda_1.tap(useMiddlewares(config)), restify_2.adapterRestify(restify_1.createServer))(config);
//# sourceMappingURL=index.js.map