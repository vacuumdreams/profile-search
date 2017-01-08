import {Request, Response, RequestHandler, Server, ServerOptions} from 'restify'
import {Config} from '../../../config'
import {
  Adapter,
  AdapterObject,
  Initializer,
  Middleware,
  RouteHandler,
  ApiOptions,
} from '../_interface'

interface ApiOptionsRestify extends ApiOptions, ServerOptions {}

interface Restify extends Initializer {
  (options?: ServerOptions): Server,
}

interface RouteHandlerRestify extends RouteHandler, RequestHandler {}

interface MiddlewareRestify extends Middleware, RequestHandler {}

interface AdapterObjectRestify extends AdapterObject {
  get?: (path: string, RouteHandlerRestify) => void,
  post?: (path: string, RouteHandlerRestify) => void,
  put?: (path: string, RouteHandlerRestify) => void,
  del?: (path: string, RouteHandlerRestify) => void,
  use?: MiddlewareRestify | MiddlewareRestify[],
}

interface AdapterRestify extends Adapter {
  (initializer: Restify): (config: Config) => AdapterObjectRestify,
}

export {
  AdapterRestify,
  AdapterObjectRestify,
  MiddlewareRestify,
  Restify,
  RouteHandlerRestify,
  ApiOptionsRestify,
}
