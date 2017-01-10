import {StorageSpec} from './storage/adapters/_interface.d'

export interface Service {
  name: string,
  type: 'storage' // | 'other'
}

export interface Services {
  storage?: Service
}
