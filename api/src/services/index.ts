import {applySpec} from 'ramda'
import {Config} from '../config'
import {storages} from './storages'

export {Services} from './_interface.d'

export const services: (config: Config) => Object = applySpec({storages})
