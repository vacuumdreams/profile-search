import {applySpec, curry} from 'ramda'
import {get} from './get'

import {RouteHandlers} from '../'

export const prezis: RouteHandlers = applySpec({get})
