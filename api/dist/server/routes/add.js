"use strict";
const ramda_1 = require("ramda");
const addRouteMethod = ramda_1.curry((server, route, method) => {
    console.log(route, method);
    return server[method](route.path, route.handlers[method]);
});
const addRoutePath = ramda_1.curry((server, route) => ramda_1.map(addRouteMethod(server, route), ramda_1.keys(route.handlers)));
exports.addRoutes = ramda_1.curry((routes, server) => {
    console.log('adding Routes');
    ramda_1.map(addRoutePath(server), routes);
});
//# sourceMappingURL=add.js.map