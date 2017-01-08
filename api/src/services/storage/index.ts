import * as fs from 'fs'
import {redis} from 'redis'
import {promisify} from 'bluebird'
import {applySpec, compose, map, path} from 'ramda'

import {Config} from '../../config'
import {jsonAdapter, redisAdapter} from './adapters'

map(promisify, [
  fs.readFile,
  redis.RedisClient.prototype.get
])

export {
  StorageOptionsJson,
  StorageOptionsRedis
} from './adapters'

export const storage: (config: Config) => Object = applySpec({
  json: compose(jsonAdapter(fs), path(['storage', 'json'])),
  redis: compose(redisAdapter(redis.createClient), path(['storage', 'redis']))
})
