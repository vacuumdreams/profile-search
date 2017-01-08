import {applySpec} from 'ramda'
import {create} from './create'

import {prezis} from './prezis'

import {RouteSpecObject} from './_interface.d'
export {
  RouteHandlers,
  RouteHandlersObject,
  RouteMethod,
  RouteSpec,
  RouteSpecObject
} from './_interface.d'

// import {storage} from '../../services'
const storage = {name: 'storage'}

export const routes: RouteSpecObject[] = [
  create('/prezis', prezis)([storage]),
]

export {addRoutes} from './add'
