"use strict";
const create_1 = require("./create");
const prezis_1 = require("./prezis");
// import {storage} from '../../services'
const storage = { name: 'storage' };
exports.routes = [
    create_1.create('/prezis', prezis_1.prezis)([storage]),
];
var add_1 = require("./add");
exports.addRoutes = add_1.addRoutes;
//# sourceMappingURL=index.js.map