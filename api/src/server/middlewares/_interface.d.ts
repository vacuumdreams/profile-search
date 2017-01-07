import {Middleware} from '../adapters/restify/_middleware.d'
import {Config} from '../../config/_interface.d'

export interface Middlewares {
  (config: Config): Middleware[]
}