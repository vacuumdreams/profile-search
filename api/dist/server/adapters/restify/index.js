"use strict";
const ramda_1 = require("ramda");
const url = require('url');
const getPort = ramda_1.compose(port => { console.log('BINDING PORT: ', port); return port; }, parseInt, ramda_1.propOr('8000', 'port'), url.parse, ramda_1.path(['server', 'url']));
const select = name => ramda_1.converge(ramda_1.bind, [
    ramda_1.prop(name),
    ramda_1.identity
]);
const expose = config => ramda_1.applySpec({
    get: select('get'),
    use: select('use'),
    start: (server) => (msg) => select('listen')(server)(getPort(config), ramda_1.always(console.log(msg))),
});
exports.adapterRestify = server => config => ramda_1.compose(expose(config), server, ramda_1.prop('server'))(config);
//# sourceMappingURL=index.js.map