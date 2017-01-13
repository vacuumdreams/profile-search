"use strict";
const path = require("path");
const dataPath = path.resolve('./data/prezis.json');
exports.config = {
    server: {
        name: 'bpbp-api',
        url: process.env.NODE_BPBP_API_URL || 'http://localhost:8000',
    },
    storage: {
        json: [{
                name: 'prezis',
                data: dataPath,
            }],
    },
};
//# sourceMappingURL=index.js.map