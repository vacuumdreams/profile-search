import {MiddlewareRestify as Middleware} from '../adapters/restify/_interface.d'
import {Config} from '../../config/_interface.d'

export interface Middlewares {
  (config: Config): Middleware[]
}
