'use strict'
import {expect} from 'chai'
import {after, describe, it} from 'mocha'
const sinon = require('sinon')

const addMiddlewares = require('../').addMiddlewares

const config = {
  server: {
    name: 'test',
  }
}

const middlewares = () => ([ 'mock-1', 'mock-2' ])

const adapter = {
  use: sinon.spy(),
}

describe('Server Middlewares', function () {

  after(function () {
    adapter.use.reset()
  })

  describe('Adding handlers', function () {
    addMiddlewares(config, middlewares, adapter)
    it('should call the adapter\'s use after configuring the middlewares', function () {
      expect(adapter.use.callCount).to.equal(1)
      expect(adapter.use.firstCall.args.length).to.equal(1)
      expect(adapter.use.firstCall.args[0]).to.deep.equal([ 'mock-1', 'mock-2' ])
    })
  })

})
