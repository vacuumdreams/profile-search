"use strict";
const path = require('ramda').path;
const util_1 = require("../../../lib/util");
exports.get = services => {
    const getData = path(['storage', 'store', 'get'])(services);
    return (req, res) => getData('prezis')
        .then(util_1.successHandler(res))
        .catch(util_1.errorHandler(res));
};
//# sourceMappingURL=get.js.map