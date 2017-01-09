import {ApiOptions} from '../server/adapters'
import {StorageOptionsJson, StorageOptionsRedis} from '../services/storages'

export interface Config {
  server: ApiOptions,
  storage: {
    json: StorageOptionsJson,
    redis: StorageOptionsRedis
  }
}
