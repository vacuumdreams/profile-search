"use strict";
const ramda_1 = require("ramda");
const extractPort = ramda_1.last;
const getPort = ramda_1.compose(parseInt, extractPort, ramda_1.split(':'), ramda_1.path(['server', 'url']));
const select = name => ramda_1.converge(ramda_1.bind, [
    ramda_1.prop(name),
    ramda_1.identity
]);
const expose = config => ramda_1.applySpec({
    get: select('get'),
    use: select('use'),
    start: (server) => () => select('listen')(server)(getPort(config), () => console.log('server listening')),
});
exports.adapterRestify = server => config => ramda_1.compose(expose(config), server, ramda_1.prop('server'))(config);
//# sourceMappingURL=index.js.map