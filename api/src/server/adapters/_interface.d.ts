import {Config} from '../../config'

export interface ServerInstance {
  (options: Object): any
}

export interface RouteHandler {
  (err: undefined | Error, req: Object, res: Object): void
}

export interface Middleware {
  (req: Object, res: Object, next: Function): void
}

export interface Route {
  get?: (services: any) => (path: string, RouteHandler) => void;
  post?: (services: any) => (path: string, RouteHandler) => void;
  put?: (services: any) => (path: string, RouteHandler) => void;
  del?: (services: any) => (path: string, RouteHandler) => void;
}

export interface RouteInject {
  (services: any): Route
}

export interface AdapterObject {
  get?: (path: string, RouteHandler) => void;
  post?: (path: string, RouteHandler) => void;
  put?: (path: string, RouteHandler) => void;
  del?: (path: string, RouteHandler) => void;
  use?: Middleware;
  start?: (...args: any[]) => void;
}

export interface Adapter {
  (initializer: any): (config: Config) => AdapterObject
}
