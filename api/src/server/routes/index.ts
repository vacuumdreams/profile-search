import {applySpec, compose, converge} from 'ramda'
import {create} from './create'

import {prezis} from './prezis'

import {Routes, RouteSpec, RouteSpecObject, RouteHandlers} from './_interface.d'
export {
  Routes,
  RouteHandlers,
  RouteHandlersObject,
  RouteMethod,
  RouteSpec,
  RouteSpecObject
} from './_interface.d'

import {services} from '../../services'
import {addServices} from './add'

const specs: RouteHandlers[] = [
  () => ({path: '/', handlers: { get: (res, req) => res.send(200, "HI THERE!")}}),
  create('prezis', prezis),
]

export const routes: Routes = compose(
  addServices(specs),
  services
)

export {addRoutes} from './add'
