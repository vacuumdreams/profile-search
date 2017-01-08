import {Storage, StorageSetup} from '../_interface.d'

export interface StorageOptionsJson {
  data: string,
}

export interface StorageJson extends Storage {}

export interface StorageSetupJson extends StorageSetup {
  (store: Object): (config: StorageOptionsJson) => StorageJson
}
