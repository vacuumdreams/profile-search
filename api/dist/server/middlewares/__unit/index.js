'use strict';
const chai = require("chai");
const sinon = require('sinon');
const expect = chai.expect;
const _1 = require("../");
const config = {
    server: {
        name: 'test',
    }
};
const middlewares = () => (['mock-1', 'mock-2']);
const adapter = {
    use: sinon.spy(),
};
describe('Server Middleware', function () {
    after(function () {
        adapter.use.reset();
    });
    describe('Adding middlewares', function () {
        _1.addMiddlewares(config, middlewares, adapter);
        it('should call the adapter\'s use after configuring the middlewares', function () {
            expect(adapter.use.callCount).to.equal(1);
            expect(adapter.use.firstCall.args.length).to.equal(1);
            expect(adapter.use.firstCall.args[0]).to.deep.equal(['mock-1', 'mock-2']);
        });
    });
});
//# sourceMappingURL=index.js.map