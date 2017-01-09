import * as fs from 'fs'
import * as redis from 'redis'
import {promisify} from 'bluebird'
import {applySpec, compose, map, path} from 'ramda'

import {Config} from '../../config'
import {jsonAdapter, redisAdapter} from './adapters'

export {
  StorageOptionsJson,
  StorageOptionsRedis
} from './adapters'

promisify(redis.RedisClient.prototype.get)
const fsAsync = {
  readFile: promisify(fs.readFile)
}

export const storages: (config: Config) => Object = applySpec({
  json: compose(jsonAdapter(fsAsync), path(['storage', 'json'])),
  redis: compose(redisAdapter(redis.createClient), path(['storage', 'redis']))
})
