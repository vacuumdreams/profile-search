"use strict";
const converge = require('ramda').converge;
const evolve = require('ramda').evolve;
const flip = require('ramda').flip;
const intersectionWith = require('ramda').intersectionWith;
const path = require('ramda').path;
const reduce = require('ramda').reduce;
const ramda_1 = require("ramda");
const util_1 = require("../../../lib/util");
const errors_1 = require("./errors");
const getTimeForArg = (index, term) => ramda_1.compose(util_1.toTimestamp, ramda_1.prop(term), util_1.toArg(index));
const sortMap = {
    createdAt: converge(ramda_1.subtract, [getTimeForArg(0, 'createdAt'), getTimeForArg(1, 'createdAt')])
};
const matchTitle = term => ramda_1.compose(ramda_1.test(new RegExp(ramda_1.toLower(term))), ramda_1.toLower, ramda_1.prop('title'));
const allowedQueryMap = data => ({
    search: ramda_1.memoize(ramda_1.compose(flip(ramda_1.filter)(data), matchTitle)),
    sort: ramda_1.memoize(ramda_1.compose(flip(ramda_1.sort)(data), ramda_1.when(ramda_1.isNil, util_1.alwaysThrow(errors_1.InvalidSortParamError)), flip(ramda_1.prop)(sortMap))),
});
const allowedQueryKeys = ramda_1.keys(allowedQueryMap(null));
// TODO: fix issue when both search and sort are applied, the result's not sorted
const intersect = reduce(flip(intersectionWith(ramda_1.eqBy(ramda_1.prop('id')))));
const isInvalidQuery = ramda_1.compose(ramda_1.not, ramda_1.isEmpty, ramda_1.without(allowedQueryKeys), ramda_1.keys);
const applyQueries = data => ramda_1.compose(intersect(data), ramda_1.values, evolve(allowedQueryMap(data)), ramda_1.pick(allowedQueryKeys), ramda_1.when(isInvalidQuery, util_1.alwaysThrow(errors_1.InvalidQueryError)));
const processQueries = req => data => ramda_1.compose(ramda_1.ifElse(ramda_1.isEmpty, ramda_1.always(data), applyQueries(data)), ramda_1.prop('query'))(req);
exports.get = services => {
    const getData = path(['storage', 'store', 'get'])(services);
    return (req, res) => getData('prezis')
        .then(processQueries(req))
        .then(util_1.successHandler(res))
        .catch(util_1.errorHandler(res));
};
//# sourceMappingURL=get.js.map