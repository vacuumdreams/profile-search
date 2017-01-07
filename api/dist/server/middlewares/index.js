"use strict";
const restify_1 = require("restify");
exports.middlewares = config => ([
    ...restify_1.bodyParser(),
    restify_1.CORS({ origins: [] })
]);
//# sourceMappingURL=index.js.map