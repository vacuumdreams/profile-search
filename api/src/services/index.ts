import {applySpec} from 'ramda'
import {Config} from '../config'
import {storage} from './storage'

export {Services} from './_interface.d'

export const services: (config: Config) => Object = applySpec({storage})
