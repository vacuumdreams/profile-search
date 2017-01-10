import {Promise} from 'bluebird'
import {Storage, StorageSetup, StorageSpec} from '../_interface.d'

export interface FS {
  readFile: (path: string) => Promise
}

export interface StorageOptionsJson {
  name: string,
  data: string,
}

export interface StorageJson extends Storage {}

export interface StorageSpecJson extends StorageSpec {
  name: 'json',
  type: 'storage',
  store: StorageJson,
}

export interface StorageSetupJson extends StorageSetup {
  (store: FS): (config: StorageOptionsJson[]) => StorageSpecJson
}
