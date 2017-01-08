import {ApiOptions} from '../server/adapters'
import {StorageOptionsJson, StorageOptionsRedis} from '../services/storage'

export interface Config {
  server: ApiOptions,
  storage: {
    json: StorageOptionsJson,
    redis: StorageOptionsRedis
  }
}
