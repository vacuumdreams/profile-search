'use strict';
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const get_1 = require("../get");
const storeGetStub = sinon.stub().returns(Promise.resolve('data'));
const services = {
    storage: {
        name: 'test',
        type: 'storage',
        store: {
            get: storeGetStub
        }
    }
};
const req = {};
const res = {
    send: sinon.spy()
};
describe('Prezis route', function () {
    afterEach(function () {
        storeGetStub.reset();
        res.send.reset();
    });
    describe('Get method', function () {
        get_1.get(services)(req, res);
        it('retrieves the data using the passed in storage service', function () {
            expect(storeGetStub.callCount).to.equal(1);
            expect(storeGetStub.firstCall.args.length).to.equal(1);
            expect(storeGetStub.firstCall.args[0]).to.equal('prezis');
            expect(res.send.callCount).to.equal(1);
            expect(res.send.firstCall.args.length).to.equal(2);
            expect(res.send.firstCall.args[0]).to.equal(200);
            expect(res.send.firstCall.args[1]).to.equal('data');
        });
    });
});
//# sourceMappingURL=index.js.map