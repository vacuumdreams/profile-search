import {curry, keys, map} from 'ramda'
import {AdapterObject} from '../adapters/'
import {RouteSpecObject} from './'

const addRouteMethod = curry((server: AdapterObject, route: RouteSpecObject, method: string) =>
  server[method](route.path, route.handlers[method])
)

const addRoutePath = curry((server: AdapterObject, route: RouteSpecObject) => 
  map(addRouteMethod(server, route), keys(route.handlers))
)

export const addRoutes = curry((routes: Array<RouteSpecObject>, server: AdapterObject) =>
  map(addRoutePath(server), routes)
)
