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
    },
};
//# sourceMappingURL=index.js.map