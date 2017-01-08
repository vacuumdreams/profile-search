import {curry, keys, map} from 'ramda'
import {AdapterObject} from '../adapters/'
import {RouteSpecObject} from './'

const addRouteMethod = curry((server: AdapterObject, route: RouteSpecObject, method: string) => {
  console.log(route, method)
  return server[method](route.path, route.handlers[method])
})

const addRoutePath = curry((server: AdapterObject, route: RouteSpecObject) => 
  map(addRouteMethod(server, route), keys(route.handlers))
)

export const addRoutes = curry((routes: Array<RouteSpecObject>, server: AdapterObject) => {
  console.log('adding Routes')
  map(addRoutePath(server), routes)
})
