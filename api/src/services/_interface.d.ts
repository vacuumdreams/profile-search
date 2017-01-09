import {StorageSpec} from './storages/adapters/_interface.d'

export interface Service {
  name: string,
  type: 'storage' // | 'other'
}

export interface Services {
  storages?: StorageSpec[]
}
