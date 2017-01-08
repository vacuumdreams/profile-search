import {AdapterObject, Middleware} from '../adapters'
import {Config} from '../../config'

export interface Middlewares {
  (config: Config): Middleware[]
}

export interface AddMiddlewares {
  (config: Config, middlewares: Middlewares): (server: AdapterObject) => void
}
