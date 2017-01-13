"use strict";
const path = require("path");
console.log('!!! ENV PORT: ', process.env.PORT);
const dataPath = path.resolve('./data/prezis.json');
//const host = process.env.NODE_BPBP_API_URL || 'http://localhost'
const host = 'http://localhost';
const port = process.env.PORT || '8000';
exports.config = {
    server: {
        name: 'bpbp-api',
        url: `${host}:${port}`,
    },
    storage: {
        json: [{
                name: 'prezis',
                data: dataPath,
            }],
    },
};
//# sourceMappingURL=index.js.map