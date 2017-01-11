"use strict";
const flip = require('ramda').flip;
const curry = require('ramda').curry;
const ramda_1 = require("ramda");
const util_1 = require("../../../../lib/util");
const errors_1 = require("../../errors");
const createSpec = ramda_1.merge({
    name: 'json',
    type: 'storage',
});
const process = curry((storeMethod, key) => {
    if (!key)
        throw new errors_1.NotFoundError();
    return storeMethod(key)
        .then(data => util_1.tryThrow(() => JSON.parse(data.toString()), errors_1.BadDataError))
        .catch(util_1.alwaysThrow(errors_1.NotFoundError));
});
exports.jsonAdapter = store => ramda_1.compose(createSpec, flip(ramda_1.assoc('store'))({}), ramda_1.applySpec({
    get: config => ramda_1.compose(process(store.readFile), ramda_1.propOr(undefined, 'data'), flip(ramda_1.find)(config), ramda_1.propEq('name'))
}));
//# sourceMappingURL=index.js.map