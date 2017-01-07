import {Request, Response, RequestHandler, Server, ServerOptions} from 'restify'
import {Config} from '../../../config/_interface.d'
import {
  Adapter,
  AdapterObject,
  Middleware,
  Route,
  RouteHandler,
  RouteInject,
  ServerInstance,
} from '../_interface'

export interface Restify extends ServerInstance {
  (options: ServerOptions): Server,
}

export interface RouteHandlerRestify extends RouteHandler {
  (err: undefined | Error, req: Request, res: Response): void,
}

export interface AdapterObjectRestify extends AdapterObject {
  get?: (path: string, RouteHandlerRestify) => void,
  post?: (path: string, RouteHandlerRestify) => void,
  put?: (path: string, RouteHandlerRestify) => void,
  del?: (path: string, RouteHandlerRestify) => void,
  use?: RequestHandler,
}

export interface RouteRestify extends Route {
  get?: (services: any) => (path: string, RouteHandlerRestify) => void,
  post?: (services: any) => (path: string, RouteHandlerRestify) => void,
  put?: (services: any) => (path: string, RouteHandlerRestify) => void,
  del?: (services: any) => (path: string, RouteHandlerRestify) => void,
}

export interface AdapterRestify extends Adapter {
  (initializer: Restify): (config: Config) => AdapterObjectRestify,
}

export interface MiddlewareRestify extends Middleware, RequestHandler {}

export interface RouteInjectRestify extends RouteInject {
  (services: any): RouteRestify
}
