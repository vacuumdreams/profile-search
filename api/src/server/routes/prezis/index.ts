import {applySpec, curry} from 'ramda'
import {get} from './get'

export const prezis = applySpec({get})
