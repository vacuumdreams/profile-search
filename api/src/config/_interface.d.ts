import {ApiOptions} from '../server/adapters'
import {StorageOptionsJson} from '../services/storage/adapters/json'
import {StorageOptionsRedis} from '../services/storage/adapters/redis'

export interface Config {
  server: ApiOptions,
  storage: {
    json: StorageOptionsJson[],
    redis: StorageOptionsRedis
  }
}
