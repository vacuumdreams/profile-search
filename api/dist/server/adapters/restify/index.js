"use strict";
const ramda_1 = require("ramda");
const createAdapter = ramda_1.applySpec({
    get: ramda_1.path(['get']),
    use: ramda_1.path(['use']),
    start: ramda_1.compose(ramda_1.path(['listen'])),
});
exports.adapterRestify = server => ramda_1.compose(createAdapter, server, ramda_1.pick(['server']));
//# sourceMappingURL=index.js.map