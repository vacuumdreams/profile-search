"use strict";
const ramda_1 = require("ramda");
const restify_1 = require("restify");
const adapters_1 = require("./adapters");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const useMiddlewares = ramda_1.curry((config, middlewares, server) => ramda_1.compose(server.use, middlewares(config)));
const addRoutes = ramda_1.curry((routes, server) => {
    console.log(routes);
    //map(map(useMethod(server)), keys(routes))
});
// const start = compose(
//   flip(call)(),
//   path(['start'])
// )
exports.server = config => ramda_1.compose(
// start,
ramda_1.tap(addRoutes(routes_1.routes)), ramda_1.tap(useMiddlewares(config, middlewares_1.middlewares)), adapters_1.adapter(restify_1.createServer))(config);
//# sourceMappingURL=index.js.map