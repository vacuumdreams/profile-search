import {applySpec, curry} from 'ramda'
import {get} from './get'

export {PreziData, PreziQueries} from './_interface.d'
import {RouteHandlers} from '../'

export const prezis: RouteHandlers = applySpec({get})
