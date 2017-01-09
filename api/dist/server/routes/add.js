"use strict";
// require converge explicitly because it's type signature is useless
const converge = require('ramda').converge;
const ramda_1 = require("ramda");
const addRouteMethod = ramda_1.curry((server, route, method) => server[method](route.path, route.handlers[method]));
const addRoutePath = ramda_1.curry((server, route) => ramda_1.map(addRouteMethod(server, route), ramda_1.keys(route.handlers)));
exports.addRoutes = ramda_1.curry((config, routes, server) => ramda_1.map(addRoutePath(server), routes(config)));
const concatSpecs = (...args) => Array.prototype.concat(args);
exports.addServices = converge(concatSpecs);
//# sourceMappingURL=add.js.map