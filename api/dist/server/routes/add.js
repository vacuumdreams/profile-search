"use strict";
const ramda_1 = require("ramda");
const addRouteMethod = ramda_1.curry((server, route, method) => server[method](route.path, route.handlers[method]));
const addRoutePath = ramda_1.curry((server, route) => ramda_1.map(addRouteMethod(server, route), ramda_1.keys(route.handlers)));
exports.addRoutes = ramda_1.curry((routes, server) => ramda_1.map(addRoutePath(server), routes));
//# sourceMappingURL=add.js.map