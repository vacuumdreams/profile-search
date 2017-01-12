"use strict";
const path = require("path");
const dataPath = path.resolve('./data/prezis.json');
exports.config = {
    server: {
        name: 'bpbp-api',
        url: 'http://localhost:8000',
    },
    storage: {
        json: [{
                name: 'prezis',
                data: dataPath,
            }],
        redis: {
            host: "127.0.0.1",
            port: 6379,
        },
    },
};
//# sourceMappingURL=index.js.map