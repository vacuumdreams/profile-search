'use strict';
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon = require('sinon');
const addMiddlewares = require('../').addMiddlewares;
const config = {
    server: {
        name: 'test',
    }
};
const middlewares = () => (['mock-1', 'mock-2']);
const adapter = {
    use: sinon.spy(),
};
mocha_1.describe('Server Middlewares', function () {
    mocha_1.after(function () {
        adapter.use.reset();
    });
    mocha_1.describe('Adding handlers', function () {
        addMiddlewares(config, middlewares, adapter);
        mocha_1.it('should call the adapter\'s use after configuring the middlewares', function () {
            chai_1.expect(adapter.use.callCount).to.equal(1);
            chai_1.expect(adapter.use.firstCall.args.length).to.equal(1);
            chai_1.expect(adapter.use.firstCall.args[0]).to.deep.equal(['mock-1', 'mock-2']);
        });
    });
});
//# sourceMappingURL=index.js.map