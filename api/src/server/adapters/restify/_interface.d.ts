import {Request, Response, RequestHandler, Server, ServerOptions} from 'restify'
import {Config} from '../../../config/_interface.d'
import {Adapter, Middleware, Route, RouteHandler} from '../_interface'

interface RestifyCreate {
  (options: ServerOptions): Server,
}

interface RestifyRouteHandler extends RouteHandler {
  (err: void | Error, req: Request, res: Response): void,
}

interface RestifyRoute extends Route {
  get?: (path: string, RestifyRouteHandler) => void,
  post?: (path: string, RestifyRouteHandler) => void,
  put?: (path: string, RestifyRouteHandler) => void,
  del?: (path: string, RestifyRouteHandler) => void,
}

interface RestifyAdapter extends Adapter, RestifyRoute {
  use: RequestHandler,
}

interface RestifyAdapterCreate {
  (config: Config): RestifyAdapter,
}

export interface AdapterRestify {
  (create: RestifyCreate): RestifyAdapterCreate,
}

export interface MiddlewareRestify extends Middleware, RequestHandler {}
