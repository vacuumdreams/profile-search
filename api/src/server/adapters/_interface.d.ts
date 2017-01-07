export interface RouteHandler {
  (err: void | Error, req: Object, res: Object): void
}

export interface Middleware {
  (req: Object, res: Object, next: Function): void
}

export interface Route {
  get?: (path: string, RouteHandler) => void;
  post?: (path: string, RouteHandler) => void;
  put?: (path: string, RouteHandler) => void;
  del?: (path: string, RouteHandler) => void;
}

export interface Adapter extends Route {
  use: (req: Object, res: Object, next: Function) => void;
  start: (...args: any[]) => void;
}
