"use strict";
const fs = require("fs");
const path = require("path");
exports.get = ({ storages }) => {
    //console.log(storage)
    return (req, res) => {
        console.log('/prezis GET handler');
        const data = fs.readFileSync(path.resolve('../api/data/prezis.json'), 'utf8');
        res.send(200, JSON.parse(data));
    };
};
//# sourceMappingURL=get.js.map