import {applySpec, curry} from 'ramda'
import {get} from './get'

import {RouteInject} from '../../adapters'

export const prezis: RouteInject = applySpec({get})
