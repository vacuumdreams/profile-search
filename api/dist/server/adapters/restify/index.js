"use strict";
const ramda_1 = require("ramda");
const select = (name) => ramda_1.compose(ramda_1.flip(ramda_1.bind), ramda_1.prop(name));
const expose = ramda_1.applySpec({
    get: select('get'),
    use: select('use'),
    start: select('listen'),
});
exports.adapterRestify = server => ramda_1.compose(expose, server, ramda_1.prop('server'));
//# sourceMappingURL=index.js.map