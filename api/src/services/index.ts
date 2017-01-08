import {applySpec} from 'ramda'
import {Config} from '../config'
import {storage} from './storage'

export (config: Config) => applySpec({storage})
