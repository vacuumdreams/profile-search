"use strict";
const ramda_1 = require("ramda");
const create_1 = require("./create");
const prezis_1 = require("./prezis");
const services_1 = require("../../services");
const add_1 = require("./add");
const specs = [
    () => ({ path: '/', handlers: { get: (res, req) => res.send(200, "HI THERE!") } }),
    create_1.create('prezis', prezis_1.prezis),
];
exports.routes = ramda_1.compose(add_1.addServices(specs), services_1.services);
var add_2 = require("./add");
exports.addRoutes = add_2.addRoutes;
//# sourceMappingURL=index.js.map