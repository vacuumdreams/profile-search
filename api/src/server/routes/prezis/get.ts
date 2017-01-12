const converge = require('ramda').converge
const evolve = require('ramda').evolve
const flip = require('ramda').flip
const intersectionWith = require('ramda').intersectionWith
const path = require('ramda').path
const reduce = require('ramda').reduce

import {always, compose, eqBy, filter, ifElse, intersection, isEmpty, isNil, keys, memoize, not,
  pick, prop, sort, subtract, test, values, when, without} from 'ramda'
import {Promise} from 'bluebird'

import {Response, Request} from '../../../server/adapters'
import {RouteMethod} from '../'
import {PreziData, PreziQueries} from './'

import {alwaysThrow, toArg, toTimestamp, successHandler, errorHandler} from '../../../lib/util'
import {InvalidQueryError, InvalidSortParamError} from './errors'

const getTimeForArg = (index, term) => compose(toTimestamp, prop(term), toArg(index))

const sortMap = {
  createdAt: converge(subtract, [getTimeForArg(0, 'createdAt'), getTimeForArg(1, 'createdAt')])
}

const matchTitle = term => compose(test(new RegExp(term)), prop('title'))

const allowedQueryMap: (data: PreziData[]) => Object = data => ({
  search: memoize(compose(
    flip(filter)(data),
    matchTitle
  )),
  sort: memoize(compose(
    flip(sort)(data),
    when(isNil, alwaysThrow(InvalidSortParamError)),
    flip(prop)(sortMap)
  )),
})

const allowedQueryKeys = keys(allowedQueryMap(null))

// TODO: fix issue when both search and sort are applied, the result's not sorted
const intersect: (acc: PreziData[]) => (results: PreziData[][]) => PreziData[] = 
  reduce(flip(intersectionWith(eqBy(prop('id')))))

const isInvalidQuery = compose(
  not,
  isEmpty,
  without(allowedQueryKeys),
  keys
)

const applyQueries: (data: PreziData[]) => (queries: PreziQueries) => PreziData[] = data => compose(
  intersect(data),
  values,
  evolve(allowedQueryMap(data)),
  pick(allowedQueryKeys),
  when(isInvalidQuery, alwaysThrow(InvalidQueryError))
)

const processQueries: (req: Request) => (data: PreziData[]) => Promise = req => data => 
  compose(
    ifElse(isEmpty, always(data), applyQueries(data)),
    prop('query')
  )(req)

export const get: RouteMethod = services => {

  const getData: (path: string) => Promise = path(['storage', 'store', 'get'])(services)

  return (req: Request, res: Response) =>
    getData('prezis')
      .then(processQueries(req))
      .then(successHandler(res))
      .catch(errorHandler(res))
}
