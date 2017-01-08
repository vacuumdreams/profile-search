import {Storage, StorageSetup} from '../_interface.d'
import {RedisClient} from 'redis'

export interface StorageOptionsRedis {
  host: string,
  port: number
}

export interface StorageRedis extends Storage {}

export interface StorageSetupRedis extends StorageSetup {
  (redis: (port, host, opt) => RedisClient): (config: StorageOptionsRedis) => StorageRedis
}
