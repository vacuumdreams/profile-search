const flip = require('ramda').flip
const curry = require('ramda').curry

import {assoc, applySpec, compose, find, merge, prop, propEq, propOr, tap} from 'ramda'
import {Promise, resolve} from 'bluebird'
import {StorageSetupJson} from './_interface.d'
import {StorageJson, StorageSpecJson} from './_interface.d'
export {
  StorageJson,
  StorageOptionsJson,
  StorageSetupJson,
  StorageSpecJson
} from './_interface.d'

import {tryThrow, alwaysThrow} from '../../../../lib/util'
import {BadDataError, NotFoundError} from '../../errors'
import {DataCache} from './cache'

const dataCache = new DataCache()

const createSpec: (store) => StorageSpecJson = merge({
  name: 'json',
  type: 'storage',
})

const process = curry((storeMethod, key: string) => {
  if (!key) throw new NotFoundError()
  const cache = dataCache.get(key)
  if (cache) return resolve(cache)
  return storeMethod(key)
    .then(data => tryThrow(() => JSON.parse(data.toString()), BadDataError))
    .then(data => dataCache.set(key, data))
    .catch(e => { console.log(e); return alwaysThrow(NotFoundError)(); })
})

export const jsonAdapter: StorageSetupJson = store => compose(
  createSpec,
  flip(assoc('store'))({}),
  applySpec({
    get: config => compose(
      process(store.readFile),
      propOr(undefined, 'data'),
      flip(find)(config),
      propEq('name')
    )
  })
)
