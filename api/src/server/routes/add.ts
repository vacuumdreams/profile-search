// require converge explicitly because it's type signature is useless
const converge = require('ramda').converge

import {curry, keys, map} from 'ramda'
import {Config} from '../../config'
import {Routes, RouteSpec, RouteSpecObject} from './'
import {AdapterObject} from '../adapters/'
import {Services} from '../../services'

const addRouteMethod = curry((server: AdapterObject, route: RouteSpecObject, method: string) =>
  server[method](route.path, route.handlers[method])
)

const addRoutePath = curry((server: AdapterObject, route: RouteSpecObject) => 
  map(addRouteMethod(server, route), keys(route.handlers))
)

export const addRoutes = curry((config: Config, routes: Routes, server: AdapterObject) =>
  map(addRoutePath(server), routes(config))
)

const concatSpecs: (...args: RouteSpecObject[]) => RouteSpecObject[] = (...args) => 
  Array.prototype.concat(args)

export const addServices: (services: Services) => (specs: RouteSpec[]) => RouteSpecObject[] = 
  converge(concatSpecs)