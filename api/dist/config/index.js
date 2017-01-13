"use strict";
const path = require("path");
const dataPath = path.normalize(__dirname + '/../../data/prezis.json');
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