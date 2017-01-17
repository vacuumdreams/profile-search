'use strict'
import {expect} from 'chai'
import {after, before, describe, it} from 'mocha'
const sinon = require('sinon')
const fs = require('fs')
const path = require('path')
const request = require('superagent')

const dataPath = path.join(__dirname, '/test-integration-prezis.json')
const data = [{
  id: 1,
  title: 'Title 1',
  createdAt: '2012-01-05'
},{
  id: 2,
  title: 'Title 2',
  createdAt: '2009-01-05'
},{
  id: 3,
  title: 'Title 3',
  createdAt: '2003-01-05'
},{
  id: 4,
  title: 'Title 4',
  createdAt: '2016-01-05'
},{
  id: 5,
  title: 'Title 5',
  createdAt: '2007-01-05'
}]

const server = require('../../../').api
let preziData

server({
  server: {
    name: 'test-integration-prezis',
    url: 'http://localhost:8900',
  },
  storage: {
    json: [{
      name: 'prezis',
      data: dataPath,
    }],
  },
})

describe('API - Prezis endpoint', function () {
  describe('GET method', function () {
    before(function () {
      preziData= fs.writeFileSync(dataPath, JSON.stringify(data), 'utf8')
    })

    after(function () {
      fs.unlinkSync(dataPath)
    })

    describe('without queries', function () {
      it('should return the contents of the given file', function (done) {
        request
          .get('http://localhost:8999/prezis')
          .withCredentials()
          .end(function (err, res) {
            expect(res.body).to.deep.equal(data)
            done()
          })
      })
    })

    describe('with search query', function () {
      it('should return the contents of the given file', function (done) {
        request
          .get('http://localhost:8999/prezis')
          .query({ search: 'Title 4' })
          .withCredentials()
          .end(function (err, res) {
            expect(res.body).to.deep.equal([data[3]])
            done()
          })
      })
    })

    describe('with sort query', function () {
      it('should return the contents of the given file', function (done) {
        request
          .get('http://localhost:8999/prezis')
          .query({ sort: 'createdAt' })
          .withCredentials()
          .end(function (err, res) {
            expect(res.body).to.deep.equal([{
              id: 3,
              title: 'Title 3',
              createdAt: '2003-01-05'
            },{
              id: 5,
              title: 'Title 5',
              createdAt: '2007-01-05'
            },{
              id: 2,
              title: 'Title 2',
              createdAt: '2009-01-05'
            },{
              id: 1,
              title: 'Title 1',
              createdAt: '2012-01-05'
            },{
              id: 4,
              title: 'Title 4',
              createdAt: '2016-01-05'
            }])
          })
          done()
      })
    })
  })
})

