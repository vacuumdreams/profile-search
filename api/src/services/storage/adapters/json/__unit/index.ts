'use strict'
import {expect} from 'chai'
import {afterEach, describe, it} from 'mocha'
const sinon = require('sinon')

import {Promise} from 'bluebird'

const jsonAdapter = require('../').jsonAdapter
const DataCache = require('../cache').DataCache

const readStub = sinon.stub()
readStub.withArgs('test-path-1').returns(Promise.resolve(new Buffer(JSON.stringify({abc: 123}))))
readStub.withArgs('test-path-2').returns(Promise.resolve(new Buffer(JSON.stringify({xyz: 987}))))

const store = {
  readFile: readStub
}

const config = [{
  name: 'abc',
  data: 'test-path-1',
},{
  name: 'xyz',
  data: 'test-path-2',
}]

describe('Services - Storage - Adapters - JSON', function () {

  afterEach(function () {
    store.readFile.reset()
  })

  describe('The JSON adapter', function () {

    const adapter = jsonAdapter(store)(config)

    it('setup returns an adapter with the right specs', function () {
      expect(adapter.name).to.equal('json')
      expect(adapter.type).to.equal('storage')
      expect(adapter.store.get).to.be.a.function
    })

    it('assigns the passed in store\'s readFile method to the adapter\'s get', function () {
      return adapter.store.get('abc').then((res) => {
        expect(res).to.deep.equal({abc: 123})
        expect(store.readFile.callCount).to.equal(1)
        expect(store.readFile.firstCall.args[0]).to.equal('test-path-1')      
      })
    })

    it('serves the rest of the requests from cache, without calling the store', function () {
      return adapter.store.get('abc').then((res) => {
        expect(res).to.deep.equal({abc: 123})
        expect(store.readFile.callCount).to.equal(0)
      })
    })
  })

  describe('The JSON adapter DataCache', function () {
    it('get method returns undefined if key is not set', function () {
      const cache = new DataCache()
      expect(cache.get('abc')).to.be.undefined
    })
    it('get method returns the store data with requested key', function () {
      const cache = new DataCache()
      cache._store['abc'] = {time: new Date().getTime(), data: {abc: 'test-2'}}
      expect(cache.get('abc')).to.deep.equal({abc: 'test-2'})
    })
    it('set method stores data under the key, adds a timestamp for inner use', function () {
      const cache = new DataCache()
      expect(cache.set('abc', {abc: 'test-3'})).to.deep.equal({abc: 'test-3'})
      expect(cache._store['abc'].data).to.deep.equal({abc: 'test-3'})
      expect(cache._store['abc'].time <= new Date().getTime()).to.be.true
    })
    it('datacache with timeout stops storing the data after the provided time', function () {
      const clock = sinon.useFakeTimers()
      const cache = new DataCache(1000)
      expect(cache._timeout).to.equal(1000)
      expect(cache.set('abc', {abc: 'test-4'})).to.deep.equal({abc: 'test-4'})
      clock.tick(50)
      expect(cache.get('abc')).to.deep.equal({abc: 'test-4'})
      expect(cache._store['abc'].data).to.deep.equal({abc: 'test-4'})
      clock.tick(2000)
      expect(cache._store['abc'].data).to.deep.equal({abc: 'test-4'})
      expect(cache.get('abc')).to.be.undefined
      expect(cache._store['abc']).to.be.undefined
      clock.restore()
    })
  })
})
