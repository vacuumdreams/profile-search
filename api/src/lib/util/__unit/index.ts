import {expect} from 'chai'
import {afterEach, describe, it} from 'mocha'
var sinon = require('sinon')

import {HTTPError} from '../../../errors'
const utils = require('../')

const res = {
  send: sinon.spy()
}

describe('Lib - Utils', function () {

  afterEach(function () {
    res.send.reset()
  })

  describe('successHandler', function () {
    it('sends response with status 200', function () {
      utils.successHandler(res)({test: 'data'})
      expect(res.send.callCount).to.equal(1)
      expect(res.send.firstCall.args[0]).to.equal(200)
      expect(res.send.firstCall.args[1]).to.deep.equal({test: 'data'})
    })
  })

  describe('errorHandler', function () {
    it('sends response with the passed in error\'s code and message', function () {
      const err = new HTTPError()
      err.code = 503
      err.msg = 'Test message'

      utils.errorHandler(res)(err)

      expect(res.send.callCount).to.equal(1)
      expect(res.send.firstCall.args[0]).to.equal(503)
      expect(res.send.firstCall.args[1]).to.deep.equal('Test message')
    })
  })

  describe('tryThrow', function () {
    it('doesn\'t throw error when the passed in function executes correctly', function () {
      expect(() => utils.tryThrow(() => ({}), HTTPError)).to.not.throw()
    })
    
    it('throws an error instance when it can\'t execute the callback', function () {
      expect(() => utils.tryThrow(() => {throw new Error()}, HTTPError)).to.throw(HTTPError)
    })
  })

  describe('alwaysThrow', function () {
    it('throws an error instance when the returned function gets called', function () {
      expect(() => utils.alwaysThrow(HTTPError)()).to.throw(HTTPError)
    })    
  })

  describe('toTimestamp', function () {
    it('converts a valid date string to a timestamp', function () {
      expect(utils.toTimestamp('2012-01-12')).to.equal(1326326400000)
    })
  })

  describe('toArg', function () {
    it('returns the nth argument of the returned function', function () {
      expect(utils.toArg(0)(1, 2, 3)).to.equal(1)
      expect(utils.toArg(3)('a', 'b', 'c', 'd', 'e')).to.equal('d')
    })
  })
})
