'use strict';
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon = require('sinon');
const adapterRestify = require('../').adapterRestify;
const config = {
    server: {
        name: 'test',
        url: 'http://localhost:80'
    }
};
const restify = {
    get: sinon.spy(),
    use: sinon.spy(),
    listen: sinon.spy(),
};
const createServer = sinon.stub().returns(restify);
mocha_1.describe('Server Adapter - Restify', function () {
    let adapter;
    mocha_1.describe('Initializing the adapter', function () {
        adapter = adapterRestify(createServer)(config);
        mocha_1.it('returns a valid adapter', function () {
            chai_1.expect(adapter.get).to.be.a.function;
            chai_1.expect(adapter.use).to.be.a.function;
            chai_1.expect(adapter.start).to.be.a.function;
        });
    });
    mocha_1.describe('Adapter method:', function () {
        mocha_1.before(function () {
            adapter = adapterRestify(createServer)(config);
        });
        mocha_1.after(function () {
            restify.get.reset();
            restify.use.reset();
            restify.listen.reset();
        });
        mocha_1.describe('calling the adapter\'s get', function () {
            mocha_1.it('should add GET handler', function () {
                adapter.get('testPath', function testRouteHandler(req, res) { });
                chai_1.expect(restify.get.callCount).to.equal(1);
                chai_1.expect(restify.get.firstCall.args.length).to.equal(2);
                chai_1.expect(restify.get.firstCall.args[0]).to.equal('testPath');
                chai_1.expect(restify.get.firstCall.args[1].name).to.equal('testRouteHandler');
            });
        });
        mocha_1.describe('calling the adapter\'s use', function () {
            mocha_1.it('should add middleware handler', function () {
                adapter.use(function testMiddleware(req, res, next) { });
                chai_1.expect(restify.use.callCount).to.equal(1);
                chai_1.expect(restify.use.firstCall.args.length).to.equal(1);
                chai_1.expect(restify.use.firstCall.args[0].name).to.equal('testMiddleware');
            });
        });
        mocha_1.describe('calling the adapter\'s start', function () {
            mocha_1.it('should launch server listening on config port', function () {
                adapter.start();
                chai_1.expect(restify.listen.callCount).to.equal(1);
                chai_1.expect(restify.listen.firstCall.args[0]).to.equal(80);
            });
        });
    });
});
//# sourceMappingURL=index.js.map