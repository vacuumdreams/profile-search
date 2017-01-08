import {Config} from '../../../config'
import {Promise} from 'bluebird'

export interface Storage {
  get?: (item?: string) => Promise, 
  set?: (item: string) => Promise,
  del?: (item: string) => Promise,
}

export interface StorageSetup {
  (store?: any): (config: Config) => Storage
}
