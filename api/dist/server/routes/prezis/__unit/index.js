'use strict';
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon = require('sinon');
const get = require('../get').get;
const data = [
    { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
    { id: 2, title: 'xyzq', createdAt: new Date('2013-01-10').toISOString() },
    { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
    { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
];
const storeGetStub = sinon.stub().returns(Promise.resolve(data));
const services = {
    storage: {
        name: 'test',
        type: 'storage',
        store: {
            get: storeGetStub
        }
    }
};
const res = {
    send: sinon.spy()
};
mocha_1.describe('Prezis route', function () {
    mocha_1.afterEach(function () {
        storeGetStub.reset();
        res.send.reset();
    });
    mocha_1.describe('Get method', function () {
        mocha_1.describe('without any query params', function () {
            get(services)({}, res);
            mocha_1.it('retrieves the data using the passed in storage service', function () {
                chai_1.expect(storeGetStub.callCount).to.equal(1);
                chai_1.expect(storeGetStub.firstCall.args.length).to.equal(1);
                chai_1.expect(storeGetStub.firstCall.args[0]).to.equal('prezis');
                chai_1.expect(res.send.callCount).to.equal(1);
                chai_1.expect(res.send.firstCall.args.length).to.equal(2);
                chai_1.expect(res.send.firstCall.args[0]).to.equal(200);
                chai_1.expect(res.send.firstCall.args[1]).to.deep.equal([
                    { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
                    { id: 2, title: 'xyzq', createdAt: new Date('2013-01-10').toISOString() },
                    { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
                    { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
                ]);
            });
        });
        mocha_1.describe('with sort query on createdAt', function () {
            get(services)({ query: { sort: 'createdAt' } }, res);
            mocha_1.it('sorts the retrieved data correctly', function () {
            });
        });
    });
});
//# sourceMappingURL=index.js.map