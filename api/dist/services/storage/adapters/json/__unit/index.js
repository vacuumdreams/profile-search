'use strict';
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sinon = require('sinon');
const bluebird_1 = require("bluebird");
const jsonAdapter = require('../').jsonAdapter;
const DataCache = require('../cache').DataCache;
const readStub = sinon.stub();
readStub.withArgs('test-path-1').returns(bluebird_1.Promise.resolve(new Buffer(JSON.stringify({ abc: 123 }))));
readStub.withArgs('test-path-2').returns(bluebird_1.Promise.resolve(new Buffer(JSON.stringify({ xyz: 987 }))));
const store = {
    readFile: readStub
};
const config = [{
        name: 'abc',
        data: 'test-path-1',
    }, {
        name: 'xyz',
        data: 'test-path-2',
    }];
mocha_1.describe('Services - Storage - Adapters - JSON', function () {
    mocha_1.afterEach(function () {
        store.readFile.reset();
    });
    mocha_1.describe('The JSON adapter', function () {
        const adapter = jsonAdapter(store)(config);
        mocha_1.it('setup returns an adapter with the right specs', function () {
            chai_1.expect(adapter.name).to.equal('json');
            chai_1.expect(adapter.type).to.equal('storage');
            chai_1.expect(adapter.store.get).to.be.a.function;
        });
        mocha_1.it('assigns the passed in store\'s readFile method to the adapter\'s get', function () {
            return adapter.store.get('abc').then((res) => {
                chai_1.expect(res).to.deep.equal({ abc: 123 });
                chai_1.expect(store.readFile.callCount).to.equal(1);
                chai_1.expect(store.readFile.firstCall.args[0]).to.equal('test-path-1');
            });
        });
        mocha_1.it('serves the rest of the requests from cache, without calling the store', function () {
            return adapter.store.get('abc').then((res) => {
                chai_1.expect(res).to.deep.equal({ abc: 123 });
                chai_1.expect(store.readFile.callCount).to.equal(0);
            });
        });
    });
    mocha_1.describe('The JSON adapter DataCache', function () {
        mocha_1.it('get method returns undefined if key is not set', function () {
            const cache = new DataCache();
            chai_1.expect(cache.get('abc')).to.be.undefined;
        });
        mocha_1.it('get method returns the store data with requested key', function () {
            const cache = new DataCache();
            cache._store['abc'] = { time: new Date().getTime(), data: { abc: 'test-2' } };
            chai_1.expect(cache.get('abc')).to.deep.equal({ abc: 'test-2' });
        });
        mocha_1.it('set method stores data under the key, adds a timestamp for inner use', function () {
            const cache = new DataCache();
            chai_1.expect(cache.set('abc', { abc: 'test-3' })).to.deep.equal({ abc: 'test-3' });
            chai_1.expect(cache._store['abc'].data).to.deep.equal({ abc: 'test-3' });
            chai_1.expect(cache._store['abc'].time <= new Date().getTime()).to.be.true;
        });
        mocha_1.it('datacache with timeout stops storing the data after the provided time', function () {
            const clock = sinon.useFakeTimers();
            const cache = new DataCache(1000);
            chai_1.expect(cache._timeout).to.equal(1000);
            chai_1.expect(cache.set('abc', { abc: 'test-4' })).to.deep.equal({ abc: 'test-4' });
            clock.tick(50);
            chai_1.expect(cache.get('abc')).to.deep.equal({ abc: 'test-4' });
            chai_1.expect(cache._store['abc'].data).to.deep.equal({ abc: 'test-4' });
            clock.tick(2000);
            chai_1.expect(cache._store['abc'].data).to.deep.equal({ abc: 'test-4' });
            chai_1.expect(cache.get('abc')).to.be.undefined;
            chai_1.expect(cache._store['abc']).to.be.undefined;
            clock.restore();
        });
    });
});
//# sourceMappingURL=index.js.map