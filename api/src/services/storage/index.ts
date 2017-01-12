const converge = require('ramda').converge
import * as fs from 'fs'
//import * as redis from 'redis'
import {promisify} from 'bluebird'
import {compose, path} from 'ramda'

import {Config} from '../../config'
import {adapter} from './adapters'
import {Storage, StorageSetup, StorageSpec} from './adapters'

export {
  Storage,
  StorageOptions,
  StorageSetup,
  StorageSpec,
} from './adapters/'

//promisifyAll(redis.RedisClient.prototype)
const fsAsync = {
  readFile: promisify(fs.readFile)
}

// export const storage: (config: Config) => StorageSpec = compose(
//   adapter(redis.createClient),
//   path(['storage', 'redis'])
// )

export const storage: StorageSetup = compose(
  adapter(fsAsync),
  path(['storage', 'json'])
)