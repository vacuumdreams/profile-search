import {Storage, StorageSetup, StorageSpec} from '../_interface.d'
import {RedisClient} from 'redis'

export interface StorageOptionsRedis {
  host: string,
  port: number
}

export interface StorageRedis extends Storage {}

interface CreateClient {
  (port: number, host: string, opt?: any): RedisClient
}

export interface StorageSetupRedis extends StorageSetup {
  (redis: CreateClient): (config: StorageOptionsRedis) => StorageRedis
}

export interface StorageSpecRedis extends StorageSpec {
  store: StorageRedis
}
