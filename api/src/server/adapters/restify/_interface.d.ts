import {
  RequestHandler,
  Server,
  ServerOptions
} from 'restify'
import {Config} from '../../../config'
import {
  Adapter,
  AdapterObject,
  Initializer,
  Middleware,
  Response,
  Request,
  RouteHandler,
  ApiOptions,
} from '../_interface'

interface RequestRestify extends Request {}
interface ResponseRestify extends Response {}

interface ApiOptionsRestify extends ApiOptions, ServerOptions {}

interface Restify extends Initializer {
  (options?: ServerOptions): Server,
}

interface RouteHandlerRestify extends RouteHandler {}

interface MiddlewareRestify extends Middleware {}

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
  ResponseRestify,
  RequestRestify,
  RouteHandlerRestify,
  ApiOptionsRestify,
}
