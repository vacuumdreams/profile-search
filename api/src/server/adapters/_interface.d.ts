import {Config} from '../../config'

export interface ApiOptions {
  name?: string,
  url?: string,
}

export interface Initializer {
  (options?: Object): any
}

export interface RouteHandler {
  (req: Object, res: Object, next?: Function): void
}

export interface Middleware {
  (req: Object, res: Object, next: Function): void
}

export interface AdapterObject {
  get?: (path: string, RouteHandler) => void;
  post?: (path: string, RouteHandler) => void;
  put?: (path: string, RouteHandler) => void;
  del?: (path: string, RouteHandler) => void;
  use?: Middleware | Middleware[];
  start?: (...args: any[]) => void;
}

export interface Adapter {
  (initializer: any): (config: Config) => AdapterObject
}
