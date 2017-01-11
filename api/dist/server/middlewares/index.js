"use strict";
const restify_1 = require("restify");
exports.middlewares = config => ([
    ...restify_1.bodyParser(),
    restify_1.queryParser(),
    restify_1.CORS({ origins: [] })
]);
var add_1 = require("./add");
exports.addMiddlewares = add_1.addMiddlewares;
//# sourceMappingURL=index.js.map