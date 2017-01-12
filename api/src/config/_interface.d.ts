import {ApiOptions} from '../server/adapters'
import {StorageOptions} from '../services/storage/adapters'
// import {StorageOptionsRedis} from '../services/storage/adapters/redis'

export interface Config {
  server: ApiOptions,
  storage: {
    json: StorageOptions[]
    // redis: StorageOptionsRedis
  }
}
