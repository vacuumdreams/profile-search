import {RouteHandler} from '../adapters'

export interface RouteMethod {
  (services: Object[]): RouteHandler
}

export interface RouteHandlersObject {
  get?: RouteHandler,
  post?: RouteHandler,
  put?: RouteHandler,
  del?: RouteHandler, 
}

export interface RouteHandlers {
  (services: Object[]): RouteHandlersObject
}

export interface RouteSpecObject {
  path?: string,
  handlers?: RouteHandlersObject,
}

export interface RouteSpec {
  (path: string, handlers: RouteHandlers): (services: Object[]) => RouteSpecObject
}
