'use strict'
import * as chai from 'chai'
const sinon = require('sinon')
const expect = chai.expect

import {adapterRestify} from '../'

const config = {
  server: {
    name: 'test',
    url: 'http://localhost:80'
  }
}

const restify = {
  get: sinon.spy(),
  use: sinon.spy(),
  listen: sinon.spy(),
}

const createServer = sinon.stub().returns(restify)

describe('Server Adapter - Restify.', function () {

  let adapter

  describe('Initializing the adapter', function () {
    adapter = adapterRestify(createServer)(config)

    it('returns a valid adapter', function () {
      expect(adapter.get).to.be.a.function
      expect(adapter.use).to.be.a.function
      expect(adapter.start).to.be.a.function
    })
  })

  describe('Adapter method:', function () {

    before(function() {
      adapter = adapterRestify(createServer)(config)
    })

    after(function () {
      restify.get.reset()
      restify.use.reset()
      restify.listen.reset()
    })

    describe('calling the adapter\'s get', function() {
      it('should add GET handler', function () {
        adapter.get('testPath', function testRouteHandler(req, res) {})
        expect(restify.get.callCount).to.equal(1)
        expect(restify.get.firstCall.args.length).to.equal(2)
        expect(restify.get.firstCall.args[0]).to.equal('testPath')
        expect(restify.get.firstCall.args[1].name).to.equal('testRouteHandler')
      })      
    })

    describe('calling the adapter\'s use', function() {
      it('should add middleware handler', function () {
        adapter.use(function testMiddleware(req, res, next) {})
        expect(restify.use.callCount).to.equal(1)
        expect(restify.use.firstCall.args.length).to.equal(1)
        expect(restify.use.firstCall.args[0].name).to.equal('testMiddleware')
      })      
    })

    describe('calling the adapter\'s start', function() {
      it('should launch server listening on config port', function () {
        adapter.start()
        expect(restify.listen.callCount).to.equal(1)
        expect(restify.listen.firstCall.args[0]).to.equal(80)
      })      
    })

  })


})
