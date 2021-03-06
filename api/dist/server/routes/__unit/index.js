'use strict';
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon = require('sinon');
const addRoutes = require('../add').addRoutes;
const addServices = require('../add').addServices;
const create = require('../create').create;
const services = [
    {
        name: 'mock-1',
        type: 'any',
        doStuff1: sinon.spy(),
    },
    {
        name: 'mock-2',
        type: 'other',
        doStuff2: sinon.spy(),
    },
];
mocha_1.describe('Server Routes', function () {
    mocha_1.afterEach(function () {
        services[0]['doStuff1'].reset();
        services[1]['doStuff2'].reset();
    });
    mocha_1.describe('Route spec creation', function () {
        const handlers = services => ({
            get: services[0].doStuff1,
            post: services[1].doStuff2,
        });
        const created = create('testPath', handlers)(services);
        mocha_1.it('should allow the use of services', function () {
            created.handlers.get('thing-1');
            chai_1.expect(services[0]['doStuff1'].callCount).to.equal(1);
            chai_1.expect(services[0]['doStuff1'].getCall(0).args[0]).to.equal('thing-1');
            created.handlers.post('thing-2');
            chai_1.expect(services[1]['doStuff2'].callCount).to.equal(1);
            chai_1.expect(services[1]['doStuff2'].getCall(0).args[0]).to.equal('thing-2');
        });
    });
    mocha_1.describe('Adding services to routes', function () {
        const routeSpecs = [
            services => ({
                path: 'path-1',
                handlers: {
                    get: services[0].doStuff1,
                    post: services[1].doStuff2
                },
            }),
            services => ({
                path: 'path-2',
                handlers: {
                    get: services[0].doStuff1
                },
            }),
        ];
        const added = addServices(routeSpecs)(services);
        mocha_1.it('makes the services available in the route handlers', function () {
            added[0].handlers.get('thing-1');
            chai_1.expect(services[0]['doStuff1'].callCount).to.equal(1);
            chai_1.expect(services[0]['doStuff1'].getCall(0).args[0]).to.equal('thing-1');
            added[0].handlers.post('thing-2');
            chai_1.expect(services[1]['doStuff2'].callCount).to.equal(1);
            chai_1.expect(services[1]['doStuff2'].getCall(0).args[0]).to.equal('thing-2');
            added[1].handlers.get('thing-3');
            chai_1.expect(services[0]['doStuff1'].callCount).to.equal(2);
            chai_1.expect(services[0]['doStuff1'].getCall(1).args[0]).to.equal('thing-3');
        });
    });
    mocha_1.describe('Adding routes', function () {
        const adapter = {
            get: sinon.spy(),
            post: sinon.spy(),
        };
        const config = {
            server: {
                name: 'TEST-CONF',
                url: 'http://test:80',
            }
        };
        const routes = sinon.stub().returns([{
                path: 'test-path-1',
                handlers: {
                    get: function test1GetHandler() { },
                    post: function test1PostHandler() { },
                },
            }, {
                path: 'test-path-2',
                handlers: {
                    get: function test2GetHandler() { },
                },
            }]);
        addRoutes(config, routes, adapter);
        mocha_1.it('should call the adapter\'s use after configuring the middlewares', function () {
            chai_1.expect(routes.callCount).to.equal(1);
            chai_1.expect(routes.firstCall.args.length).to.equal(1);
            chai_1.expect(routes.firstCall.args[0]).to.deep.equal(config);
            chai_1.expect(adapter.get.callCount).to.equal(2);
            chai_1.expect(adapter.get.getCall(0).args.length).to.equal(2);
            chai_1.expect(adapter.get.getCall(0).args[0]).to.equal('test-path-1');
            chai_1.expect(adapter.get.getCall(0).args[1].name).to.equal('test1GetHandler');
            chai_1.expect(adapter.get.getCall(1).args.length).to.equal(2);
            chai_1.expect(adapter.get.getCall(1).args[0]).to.equal('test-path-2');
            chai_1.expect(adapter.get.getCall(1).args[1].name).to.equal('test2GetHandler');
            chai_1.expect(adapter.post.callCount).to.equal(1);
            chai_1.expect(adapter.post.getCall(0).args.length).to.equal(2);
            chai_1.expect(adapter.post.getCall(0).args[0]).to.equal('test-path-1');
            chai_1.expect(adapter.post.getCall(0).args[1].name).to.equal('test1PostHandler');
        });
    });
});
//# sourceMappingURL=index.js.map