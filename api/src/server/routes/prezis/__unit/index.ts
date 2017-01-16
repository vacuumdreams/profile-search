'use strict'
import {expect} from 'chai'
import {afterEach, describe, it} from 'mocha'
const sinon = require('sinon')

const get = require('../get').get

const data = [
  { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
  { id: 2, title: 'xyzq', createdAt: new Date('2013-01-10').toISOString() },
  { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
  { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
]

const storeGetStub = sinon.stub().returns(Promise.resolve(data))

const services = {
  storage: {
    name: 'test',
    type: 'storage',
    store: {
      get: storeGetStub
    }
  }
}

const res = {
  send: sinon.spy()
}

describe('Prezis route', function () {

  afterEach(function () {
    storeGetStub.reset()
    res.send.reset()
  })

  describe('Get method', function () {

    describe('without any query params', function () {
      it('retrieves the data for prezis', function () {
        return get(services)({ query: {}}, res).then(() => {
          expect(storeGetStub.callCount).to.equal(1)
          expect(storeGetStub.firstCall.args.length).to.equal(1)
          expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

          expect(res.send.callCount).to.equal(1)

          expect(res.send.firstCall.args.length).to.equal(2)
          expect(res.send.firstCall.args[0]).to.equal(200)
          expect(res.send.firstCall.args[1]).to.deep.equal([
            { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
            { id: 2, title: 'xyzq', createdAt: new Date('2013-01-10').toISOString() },
            { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
            { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
          ])
        })
      })
    })

    describe('with sort query on createdAt', function () {

      it('sorts the retrieved data correctly', function () {
        return get(services)({ query: { sort: 'createdAt' }}, res).then(() => {
          expect(storeGetStub.callCount).to.equal(1)
          expect(storeGetStub.firstCall.args.length).to.equal(1)
          expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

          expect(res.send.callCount).to.equal(1)

          expect(res.send.firstCall.args.length).to.equal(2)
          expect(res.send.firstCall.args[0]).to.equal(200)
          expect(res.send.firstCall.args[1]).to.deep.equal([
            { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
            { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
            { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
            { id: 2, title: 'xyzq', createdAt: new Date('2013-01-10').toISOString() },
          ])          
        })
      })
    })

    describe('with search query on title', function () {

      it('returns items with corresponding title', function () {
        return get(services)({ query: { search: 'uuoo' }}, res).then(() => {
          expect(storeGetStub.callCount).to.equal(1)
          expect(storeGetStub.firstCall.args.length).to.equal(1)
          expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

          expect(res.send.callCount).to.equal(1)

          expect(res.send.firstCall.args.length).to.equal(2)
          expect(res.send.firstCall.args[0]).to.equal(200)
          expect(res.send.firstCall.args[1]).to.deep.equal([
            { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
          ])          
        })
      })

      it('which is case insensitive', function () {
        return get(services)({ query: { search: 'UUoo' }}, res).then(() => {
          expect(storeGetStub.callCount).to.equal(1)
          expect(storeGetStub.firstCall.args.length).to.equal(1)
          expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

          expect(res.send.callCount).to.equal(1)

          expect(res.send.firstCall.args.length).to.equal(2)
          expect(res.send.firstCall.args[0]).to.equal(200)
          expect(res.send.firstCall.args[1]).to.deep.equal([
            { id: 3, title: 'uuoo', createdAt: new Date('2009-01-10').toISOString() },
          ])          
        })
      })

      it('allows partial matches', function () {
        return get(services)({ query: { search: 'a' }}, res).then(() => {
          expect(storeGetStub.callCount).to.equal(1)
          expect(storeGetStub.firstCall.args.length).to.equal(1)
          expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

          expect(res.send.callCount).to.equal(1)

          expect(res.send.firstCall.args.length).to.equal(2)
          expect(res.send.firstCall.args[0]).to.equal(200)
          expect(res.send.firstCall.args[1]).to.deep.equal([
            { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
            { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
          ])          
        })
      })
    })

    // TODO: FIX THIS FUNCTIONALITY
    // describe('with both search and sort', function () {

    //   it('returns the matched items in sort order', function () {
    //     return get(services)({ query: { search: 'a', sort: 'createdAt' }}, res).then(() => {
    //       expect(storeGetStub.callCount).to.equal(1)
    //       expect(storeGetStub.firstCall.args.length).to.equal(1)
    //       expect(storeGetStub.firstCall.args[0]).to.equal('prezis')

    //       expect(res.send.callCount).to.equal(1)

    //       expect(res.send.firstCall.args.length).to.equal(2)
    //       expect(res.send.firstCall.args[0]).to.equal(200)
    //       expect(res.send.firstCall.args[1]).to.deep.equal([
    //         { id: 4, title: 'asdw', createdAt: new Date('2006-01-10').toISOString() },
    //         { id: 1, title: 'abcd', createdAt: new Date('2010-01-10').toISOString() },
    //       ])           
    //     })
    //   })
    // })

  })
})
