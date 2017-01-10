const flip = require('ramda').flip
const curry = require('ramda').curry

import {assoc, applySpec, compose, find, merge, prop, propEq} from 'ramda'
import {Promise} from 'bluebird'
import {StorageSetupJson} from './_interface.d'
import {StorageJson, StorageSpecJson} from './_interface.d'
export {
  StorageJson,
  StorageOptionsJson,
  StorageSetupJson,
  StorageSpecJson
} from './_interface.d'

import {tryThrow} from '../../../../lib/util'
import {BadDataError} from '../../errors'

const createSpec: (store) => StorageSpecJson = merge({
  name: 'json',
  type: 'storage',
})

const process = curry((storeMethod, key) => 
  storeMethod(key)
    .then(data => tryThrow(() => JSON.parse(data.toString()), BadDataError))
)

export const jsonAdapter: StorageSetupJson = store => compose(
  createSpec,
  flip(assoc('store'))({}),
  applySpec({
    get: config => compose(
      process(store.readFile),
      prop('data'),
      flip(find)(config),
      propEq('name')
    )
  })
)
