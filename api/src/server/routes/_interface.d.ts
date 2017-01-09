import {Config} from '../../config'
import {RouteHandler} from '../adapters'
import {Services} from '../../services'

export interface RouteMethod {
  (services: Services): RouteHandler
}

export interface RouteHandlersObject {
  get?: RouteHandler,
  post?: RouteHandler,
  put?: RouteHandler,
  del?: RouteHandler, 
}

export interface RouteHandlers {
  (services: Services): RouteHandlersObject
}

export interface RouteSpecObject {
  path?: string,
  handlers?: RouteHandlersObject,
}

export interface RouteSpec {
  (path: string, handlers: RouteHandlers): (services: Services) => RouteSpecObject
}

export interface Routes {
  (config: Config): RouteSpecObject[]
}
